const { BrevoClient } = require('@getbrevo/brevo');

const client = new BrevoClient({ apiKey: process.env.BREVO_API_KEY });

module.exports = (eventBus) => {
  eventBus.on('booking.created', async ({ booking, user, listing }) => {
    try {
      await client.transactionalEmails.sendTransacEmail({
        to: [{ email: user.email, name: user.username }],
        sender: { email: 'viquaruddinanas2694@gmail.com', name: 'UrbanStay' },
        subject: `Booking Confirmed — ${listing.title}`,
        htmlContent: `
          <h2>Your booking is confirmed!</h2>
          <p><b>Property:</b> ${listing.title}</p>
          <p><b>Location:</b> ${listing.location}</p>
          <p><b>Check-in:</b> ${booking.checkin}</p>
          <p><b>Check-out:</b> ${booking.checkout}</p>
          <p><b>Total:</b> ₹${booking.totalPrice}</p>
        `,
      });
      console.log('Confirmation email sent to', user.email);
    } catch (err) {
      console.error('Email error:', err.message);
    }
  });
};