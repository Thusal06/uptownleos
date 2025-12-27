// Simple script to add Yohani Gunathilaka
// Can be run via: node scripts/add-yohani.js

const yohaniData = {
  name: "Leo Lion Yohani Gunathilaka",
  role: "Assistant Secretary",
  avatar: "/board/yohani.jpg",
  biography: "Detail-oriented administrator supporting the Club Secretary in managing official documentation, communications, and ensuring smooth administrative operations.",
  background: "Leo Lion Yohani Gunathilaka serves as Assistant Secretary, providing crucial support to the Club Secretary in managing all administrative functions of LLCCUE. Her attention to detail and organizational skills ensure that all club records are maintained accurately and communications are handled efficiently.",
  achievements: [
    "Assists in maintaining official club records and documentation",
    "Supports communication with members and external stakeholders",
    "Helps coordinate club meetings and events",
    "Ensures compliance with Lions International administrative standards"
  ],
  joinedYear: "2025",
  email: "yohani@llccue.org",
  quote: "Efficient administration is the foundation of effective service.",
  isActive: true,
  order: 2
};

console.log("To add Leo Lion Yohani Gunathilaka, you can:");
console.log("1. Use the admin panel at /admin/leadership and click 'Add Officer'");
console.log("2. Or run this API call when MongoDB is accessible:");
console.log(`curl -X POST http://localhost:3000/api/officers -H "Content-Type: application/json" -d '${JSON.stringify(yohaniData)}'`);
console.log("\nOfficer data prepared:");
console.log(JSON.stringify(yohaniData, null, 2));