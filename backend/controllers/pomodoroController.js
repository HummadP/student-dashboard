import PomodoroSession from "../models/PomodoroSession.js";

export const savePomodoroSession = async (req, res) => {
  const { focusMinutes } = req.body;
  try {
    const newSession = new PomodoroSession({
      userId: req.user.id,
      focusMinutes,
    });
    await newSession.save();
    res.status(201).json({ msg: "Pomodoro session saved." });
  } catch (err) {
    res.status(500).json({ msg: "Server error while saving session." });
  }
};

export const getTotalFocusTime = async (req, res) => {
  try {
    const sessions = await PomodoroSession.find({ userId: req.user.id });
    const total = sessions.reduce(
      (sum, session) => sum + (session.focusMinutes || 0),
      0
    );
    res.status(200).json({ focusTime: total });
  } catch (err) {
    console.error("Error fetching total focus time:", err);
    res
      .status(500)
      .json({ error: "Server error while retrieving focus time." });
  }
};

export const clearPomodoroSessions = async (req, res) => {
  try {
    await PomodoroSession.deleteMany({ userId: req.user.id });
    res.status(200).json({ msg: "All pomodoro sessions cleared." });
  } catch (err) {
    console.error("Error clearing sessions:", err);
    res.status(500).json({ error: "Server error while clearing sessions." });
  }
};
