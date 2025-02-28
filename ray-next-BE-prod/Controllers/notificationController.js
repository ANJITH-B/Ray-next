const Notification = require("../Models/notificationModel");
const { getIo } = require("../socket");

module.exports.getNotifications = async (req, res) => {
  try {
    console.log('getNotifications');
    const notifications = await Notification.find().sort({ createdAt: -1 }).limit(10);
    res.status(200).json({ success: true, data: notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.createNotification = async (req, res) => {
  try {
    const { message, type } = req.body;
    const notification = new Notification({ message, type });
    await notification.save();    
    const io = getIo();
    io.emit("new_notification", notification);
    res.status(200).json({ success: true, message: "Notification created successfully" });
  } catch (error) {
    console.error("Error creating notification:", error.message);
  }
};
