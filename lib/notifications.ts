export interface Notification {
  id: string;
  title: string;
  titleHi: string;
  message: string;
  messageHi: string;
  timestamp: string;
  read: boolean;
  type: "info" | "success" | "warning";
  href?: string;
}

export const DEMO_NOTIFICATIONS: Notification[] = [
  { id: "n1", title: "Request Received", titleHi: "अनुरोध प्राप्त", message: "Finding professionals for your plumbing request", messageHi: "आपके प्लंबिंग अनुरोध के लिए पेशेवर खोज रहे हैं", timestamp: "2 min ago", read: false, type: "info", href: "/customer/matching" },
  { id: "n2", title: "Provider Accepted", titleHi: "प्रदाता स्वीकार", message: "Ramesh Kumar accepted your request", messageHi: "रमेश कुमार ने आपका अनुरोध स्वीकार कर लिया", timestamp: "5 min ago", read: false, type: "success", href: "/customer/tracking" },
  { id: "n3", title: "Service Completed", titleHi: "सेवा पूर्ण", message: "Job JHS-001 completed successfully", messageHi: "काम JHS-001 सफलतापूर्वक पूरा हुआ", timestamp: "1 hour ago", read: true, type: "success", href: "/customer/invoice/JHS-001" },
  { id: "n4", title: "Payment Received", titleHi: "भुगतान प्राप्त", message: "₹299 payment confirmed for JHS-001", messageHi: "JHS-001 के लिए ₹299 भुगतान की पुष्टि हो गई", timestamp: "1 hour ago", read: true, type: "success" },
];

export function getUnreadCount(notifications: Notification[]): number {
  return notifications.filter((n) => !n.read).length;
}
