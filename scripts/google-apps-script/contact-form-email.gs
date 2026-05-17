const CONTACT_FORM_RECIPIENT = "yashovrattiwari@gmail.com";
const SERVICE_NAME = "yashovrat-portfolio-contact-form";

function doPost(e) {
  try {
    const data = getContactFormData_(e);
    const fields = {
      name: data.name || "",
      email: data.email || "",
      projectType: data.projectType || "",
      timeline: data.timeline || "",
      message: data.message || "",
      source: data.source || "yashovrat-portfolio",
    };

    MailApp.sendEmail({
      to: CONTACT_FORM_RECIPIENT,
      replyTo: fields.email || undefined,
      subject: "New Yashovrat portfolio form submission",
      body: buildContactEmailBody_(fields),
    });

    sendSubmitterConfirmation_(fields);

    return jsonResponse_({ ok: true });
  } catch (error) {
    return jsonResponse_(
      {
        ok: false,
        error: error && error.message ? error.message : "Unable to process submission.",
      },
      500
    );
  }
}

function doGet() {
  return jsonResponse_({ ok: true, service: SERVICE_NAME });
}

function doOptions() {
  return jsonResponse_({ ok: true });
}

function getContactFormData_(e) {
  if (!e) return {};

  if (e.parameter && Object.keys(e.parameter).length) {
    return e.parameter;
  }

  const contents = e.postData && e.postData.contents;
  if (!contents) return {};

  try {
    return JSON.parse(contents);
  } catch (error) {
    return {};
  }
}

function sendSubmitterConfirmation_(fields) {
  if (!isEmailAddress_(fields.email)) return;

  try {
    MailApp.sendEmail({
      to: fields.email,
      replyTo: CONTACT_FORM_RECIPIENT,
      subject: "Your request was sent to Yashovrat Tiwari",
      body: buildSubmitterConfirmationBody_(fields),
    });
  } catch (error) {
    console.warn("Submitter confirmation email failed: " + (error && error.message ? error.message : error));
  }
}

function isEmailAddress_(value) {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function buildContactEmailBody_(fields) {
  const submittedAt = Utilities.formatDate(
    new Date(),
    Session.getScriptTimeZone(),
    "yyyy-MM-dd HH:mm:ss z"
  );

  return [
    "New Yashovrat portfolio form submission",
    "",
    "Name: " + fields.name,
    "Email: " + fields.email,
    "Project type: " + fields.projectType,
    "Timeline / budget: " + fields.timeline,
    "Source: " + fields.source,
    "",
    "Message:",
    fields.message,
    "",
    "Submitted at: " + submittedAt,
    "",
    "Deploy note: this Apps Script sends from the Google account that deploys the web app. Deploy it from yashovrat56@gmail.com to send from that account.",
  ].join("\n");
}

function buildSubmitterConfirmationBody_(fields) {
  const lines = [
    "Hi" + (fields.name ? " " + fields.name : "") + ",",
    "",
    "Your request was sent to Yashovrat Tiwari from his portfolio website.",
    "He has your details and can reply directly to this email.",
  ];

  const summary = [];
  if (fields.projectType) summary.push("Project type: " + fields.projectType);
  if (fields.timeline) summary.push("Timeline / budget: " + fields.timeline);
  if (fields.message) summary.push("Message: " + fields.message);

  if (summary.length) {
    lines.push("", "Request summary:", ...summary);
  }

  lines.push("", "Thanks,", "Yashovrat Tiwari");

  return lines.join("\n");
}

function jsonResponse_(payload, statusCode) {
  const body = JSON.stringify({
    status: statusCode || 200,
    ...payload,
  });

  return ContentService.createTextOutput(body).setMimeType(ContentService.MimeType.JSON);
}
