const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post("/payment", async (req, res) => {
  try {
    const { tokenId, amount } = req.body;

    // Create PaymentMethod using the token
    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: {
        token: tokenId,
      },
    });

    // Create PaymentIntent using the PaymentMethod
    const paymentIntent = await stripe.paymentIntents.create({
      payment_method: paymentMethod.id,
      amount,
      currency: "usd",
      confirmation_method: "manual",
      confirm: true,
      return_url: 'https://localhost:3000/success', // Replace with your actual return URL
    });

    res.status(200).json({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ error: "Payment processing failed" });
  }
});

module.exports = router;
