import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, location, items, subtotal, delivery, total } =
      await request.json();

    if (!name || !email || !items || !Array.isArray(items)) {
      return NextResponse.json(
        { success: false, message: "Invalid order data." },
        { status: 400 }
      );
    }

    const emailText = `
Order Details:
Name: ${name}
Email: ${email}
Phone: ${phone}
Location: ${location}
Items: ${items
      .map(
        (item: any) =>
          `${item.name} : ${item.price} x ${item.quantity} = ${
            item.price * item.quantity
          }`
      )
      .join(", ")}
Subtotal: ${subtotal}
Delivery: ${delivery} "(expected)"
Total: ${total}
`;

    const emailHtml = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
<h2 style="text-align: center; color: #333;">🛒 Order Confirmation</h2>

<p style="font-size: 16px; color: #555;">Hello <strong>${name}</strong>,</p>
<p style="font-size: 16px; color: #555;">Thank you for your order! Here are your order details:</p>

<div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px;">
  <p><strong>📌 Name:</strong> ${name}</p>
  <p><strong>📧 Email:</strong> ${email}</p>
  <p><strong>📞 Phone:</strong> ${phone}</p>
  <p><strong>📍 Location:</strong> ${location}</p>
</div>

<h3 style="color: #333; margin-top: 20px;">🛍️ Order Summary:</h3>
<table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
  <thead>
    <tr>
      <th style="border-bottom: 2px solid #ddd; padding: 8px; text-align: left;">Item</th>
      <th style="border-bottom: 2px solid #ddd; padding: 8px; text-align: center;">Qty</th>
      <th style="border-bottom: 2px solid #ddd; padding: 8px; text-align: right;">Price</th>
    </tr>
  </thead>
  <tbody>
    ${items
      .map(
        (item: any) => `
        <tr>
          <td style="border-bottom: 1px solid #eee; padding: 8px;">${
            item.name
          }</td>
          <td style="border-bottom: 1px solid #eee; padding: 8px; text-align: center;">${
            item.quantity
          }</td>
          <td style="border-bottom: 1px solid #eee; padding: 8px; text-align: right;">${
            item.price * item.quantity
          } PKR</td>
        </tr>`
      )
      .join("")}
  </tbody>
</table>

<div style="margin-top: 20px; padding: 10px; background: #f1f1f1; border-radius: 8px;">
  <p><strong>Subtotal:</strong> ${subtotal} PKR</p>
  <p><strong>Delivery:</strong> ${delivery} PKR (Expected) </p>
  <p style="font-size: 18px; font-weight: bold;">Total: ${total} PKR</p>
</div>

<p style="text-align: center; margin-top: 20px;">
  <strong>📦 Your order will confirmed and will be delivered soon! 🚚</strong>
</p>

<p style="text-align: center; font-size: 14px; color: #888; margin-top: 20px;">
  If you have any questions, contact us at <a href="mailto:saaddotes@gmail.com">saaddotes@gmail.com</a> | +923475300422.
</p>

<p style="text-align: center; font-size: 14px; color: #aaa;">
  © ${new Date().getFullYear()} | Saad Ali . All Rights Reserved.
</p>
</div>
`;

    const transporter = nodemailer.createTransport({
      host: "smtp.titan.email",
      port: 465,
      secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    const mailOptions = {
      from: process.env.USER,
      to: [email, process.env.USER],
      subject: "Order Confirmation",
      text: emailText,
      html: emailHtml,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);

    return NextResponse.json(
      { success: true, message: "Order placed and email sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred while placing the order." },
      { status: 500 }
    );
  }
}
