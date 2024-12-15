const Stripe = require("stripe");
const Payment = require("../schema/payment");
const User = require("../schema/user");

const stripe = Stripe(
  "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"
); // Replace with your Stripe Secret Key

exports.subscriptionStripe = async (req, res) => {
  const userId = req.user.userId; // Assuming you have user info from middleware
  const { priceId, type } = req.body;
  console.log(type);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        userId: userId,
        type: type,
        // Attach userId to metadata
      },
      success_url:
        "https://emenu-sandy.vercel.app/dashboard/PaymentDone?session_id={CHECKOUT_SESSION_ID}", // Attach session ID
      cancel_url: "https://emenu-sandy.vercel.app/dashboard/subscription", // Redirect after cancel
    });
    // Send the session URL back to the client
    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to create session" });
  }
};

exports.verifyPayment = async (req, res) => {
  const { sessionId } = req.query; // Pass sessionId from frontend
  console.log(sessionId);

  try {
    // Check if payment already exists
    const existingPayment = await Payment.findOne({ sessionId });
    if (existingPayment) {
      return res.status(400).json({
        success: false,
        message: "Payment record already exists",
        data: existingPayment,
      });
    }

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      const invoice = session.invoice
        ? await stripe.invoices.retrieve(session.invoice)
        : null;

      const invoicePdf = invoice ? invoice.invoice_pdf : null;

      const newPayment = new Payment({
        userId: session.metadata.userId,
        email: session.customer_details.email,
        amount: session.amount_total / 100,
        sessionId: session.id,
        invoiceId: invoicePdf,
        customerName: session.customer_details.name,
        paymentStatus: session.payment_status,
        currency: session.currency,
        createdAt: new Date(session.created * 1000),
      });

      await newPayment.save();

      // Update user's subscription details
      const subscriptionStartDate = new Date(); // Current date
      let subscriptionEndDate;
      let subscriptionType;

      // Determine subscription type based on session metadata or default logic
      if (session.metadata.type === "yearly") {
        subscriptionType = "yearly";
        subscriptionEndDate = new Date(
          subscriptionStartDate.setFullYear(
            subscriptionStartDate.getFullYear() + 1
          )
        );
      } else if (session.metadata.type === "monthly") {
        subscriptionType = "monthly";
        subscriptionEndDate = new Date(
          subscriptionStartDate.setMonth(subscriptionStartDate.getMonth() + 1)
        );
      }

      await User.findByIdAndUpdate(session.metadata.userId, {
        subscriptionStatus: "active",
        subscriptionType,
        subscriptionStartDate: new Date(),
        subscriptionEndDate,
      });

      return res.status(200).json({
        success: true,
        invoicePdf,
        sessionDetails: session,
        payment: newPayment,
      });
    } else {
      console.log("Payment not successful");
      return res.status(400).json({
        success: false,
        message: "Payment not completed",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Unable to verify payment",
    });
  }
};

exports.paymentDetails = async (req, res) => {
  try {
    const userId = req.user.userId; // Assuming user info is extracted by middleware

    // Find payment details by userId
    const payments = await Payment.find({ userId }); // Use `find` to get all payments for this user
    const userFound = await User.findById(userId);
    console.log(userFound);
    const subscriptionStatus = userFound.subscriptionType;

    if (!payments || payments.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No payment records found for this user.",
      });
    }
    subscriptionType: res.status(200).json({
      success: true,
      message: "Payment records fetched successfully.",
      data: payments,
      subscriptionStatus,
    });
  } catch (error) {
    console.error("Error fetching payment details:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
