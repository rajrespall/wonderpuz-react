import React, { useState, useEffect, useRef } from "react";
import { Box, Modal, Slider, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SettingsIcon from "@mui/icons-material/Settings"; // MUI settings icon
import backgroundImage from "../assets/images/wonderpuzbg.png"; // Background
import easyImage from "../assets/images/easy.png";
import mediumImage from "../assets/images/medium.png";
import hardImage from "../assets/images/hard.png";
import backgroundMusic from "../assets/audio/bg-forest.mp3"; // Background music 🎵
import "@fontsource/press-start-2p"; // Import Pixel Font

const Home = () => {
  const navigate = useNavigate();
  const [openSettings, setOpenSettings] = useState(false);
  const [volume, setVolume] = useState(0.5); // Default volume (50%)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false); // Track if music started
  const audioRef = useRef(null);

  // ✅ Play music on first user interaction
  const handleUserInteraction = () => {
    if (!isAudioPlaying && audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.play()
        .then(() => setIsAudioPlaying(true))
        .catch((error) => console.error("Autoplay blocked:", error));
    }
  };

  // ✅ Update volume dynamically (but NOT saved)
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
      onClick={handleUserInteraction} // ✅ Start audio on first click
    >
      {/* ✅ Background Music (Click to Play) */}
      <audio ref={audioRef} src={backgroundMusic} loop />

      {/* Animated & Glowing Game Title */}
      <motion.div
        initial={{ y: -10 }}
        animate={{
          y: [0, -10, 0], // Floating effect
          textShadow: [
            "0px 0px 10px rgba(255,255,0,0.8)",
            "0px 0px 20px rgba(255,255,0,1)",
            "0px 0px 10px rgba(255,255,0,0.8)",
          ], // Glowing effect
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        style={{
          fontSize: "100px",
          fontWeight: "bold",
          color: "#faef92",
          fontFamily: "'Press Start 2P', sans-serif",
          letterSpacing: "5px",
          transform: "skewX(-10deg)",
          filter: "brightness(1.0)",
        }}
      >
        WonderPuz
      </motion.div>

      {/* Difficulty Selection */}
      <Box
        sx={{
          display: "flex",
          gap: "0",
          marginTop: "0px",
        }}
      >
        {/* Easy */}
        <motion.img
          src={easyImage}
          alt="Easy"
          whileHover={{
            scale: 1,
            filter: "brightness(1.2)",
          }}
          whileTap={{ scale: 0.9 }}
          style={{
            scale: 0.9,
            width: "300px",
            cursor: "pointer",
            transition: "transform 0.2s",
          }}
          onClick={() => navigate("/Jigsaw")}
        />

        {/* Medium */}
        <motion.img
          src={mediumImage}
          alt="Medium"
          whileHover={{
            scale: 1,
            filter: "brightness(1.2)",
          }}
          whileTap={{ scale: 0.9 }}
          style={{
            scale: 0.9,
            width: "300px",
            cursor: "pointer",
            transition: "transform 0.2s",
          }}
          onClick={() => navigate("/medium")}
        />

        {/* Hard */}
        <motion.img
          src={hardImage}
          alt="Hard"
          whileHover={{
            scale: 1,
            filter: "brightness(1.2)",
          }}
          whileTap={{ scale: 0.9 }}
          style={{
            scale: 0.9,
            width: "300px",
            cursor: "pointer",
            transition: "transform 0.2s",
          }}
          onClick={() => navigate("/hard")}
        />
      </Box>

      {/* ✅ Settings Button (Top Right) */}
      <IconButton
        onClick={() => setOpenSettings(true)}
        sx={{
          position: "absolute",
          top: "20px",
          right: "20px",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          color: "white",
          padding: "10px",
          borderRadius: "50%",
          "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.8)" },
        }}
      >
        <SettingsIcon fontSize="large" />
      </IconButton>

      {/* ✅ Settings Modal */}
      <Modal open={openSettings} onClose={() => setOpenSettings(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "300px",
            backgroundColor: "rgba(255, 228, 196, 0.95)",
            padding: "20px",
            borderRadius: "12px",
            textAlign: "center",
            boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.3)",
          }}
        >
          <h2 style={{ fontFamily: "'Press Start 2P', sans-serif", color: "#3e2723" }}>
            Settings
          </h2>

          <Box sx={{ width: "100%", marginTop: "20px" }}>
            <Typography
              sx={{ fontSize: "16px", fontWeight: "bold", color: "#3e2723" }}
            >
              Volume
            </Typography>
            <Slider
              value={volume}
              min={0}
              max={1}
              step={0.01}
              onChange={(event, newVolume) => setVolume(newVolume)}
              sx={{ color: "#FF5733" }}
            />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Home;
