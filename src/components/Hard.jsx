import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Button, IconButton, Slider, Modal } from "@mui/material";
import { motion } from "framer-motion";
import { JigsawPuzzle } from "react-jigsaw-puzzle";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SettingsIcon from "@mui/icons-material/Settings";
import backgroundMusic from "../assets/audio/bg-forest.mp3"; // ✅ Import background audio

import "react-jigsaw-puzzle/lib/jigsaw-puzzle.css";
import backgroundImage from "../assets/images/puzgamebg.png"; // Background
import puzzleBoard from "../assets/images/puzzleboard.png"; // Puzzle board
import sharkImage from "../assets/images/76.png";
import turtleImage from "../assets/images/77.png";
import salamanderImage from "../assets/images/78.png";
import fishImage from "../assets/images/79.png";

// Remove scrollbars globally
document.body.style.overflow = "hidden";
document.documentElement.style.overflow = "hidden";

const images = [sharkImage, turtleImage, salamanderImage, fishImage];

const Hard = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSolved, setIsSolved] = useState(false);
  const [showOriginal, setShowOriginal] = useState(true);
  const [scatter, setScatter] = useState(false);
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false); // Timer starts after animation
  const [openModal, setOpenModal] = useState(false);
  const [openBackModal, setOpenBackModal] = useState(false);
  const gameSavedRef = useRef(false);

  const [openSettings, setOpenSettings] = useState(false); // Modal state
  const [volume, setVolume] = useState(0.5); // Default volume 50%
  const [isAudioPlaying, setIsAudioPlaying] = useState(false); // Prevent multiple plays
  const audioRef = useRef(null); // Reference for audio

  const navigate = useNavigate();

  const sendGameData = async (isCompleted) => {
    if (gameSavedRef.current) return; // ✅ Prevent duplicate API requests
    gameSavedRef.current = true; // ✅ Mark game as saved

    try {
      const response = await axios.post(
        "http://localhost:5000/api/puz",
        {
          timeSpent: time,
          difficulty: "easy",
          isCompleted,
          playedAt: new Date().toISOString(),
        },
        { withCredentials: true }
      );

      if (response.status === 201) {
        console.log("Game session saved successfully");
      } else {
        console.error("Failed to save game session");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUserInteraction = () => {
    if (!isAudioPlaying && audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.play()
        .then(() => setIsAudioPlaying(true))
        .catch((error) => console.error("Autoplay blocked:", error));
    }
  };

  const startNewGame = () => {
    setIsSolved(false);
    setShowOriginal(true);
    setScatter(false);
    setTime(0);
    setRunning(false);
    const newImage = images[Math.floor(Math.random() * images.length)];
    setSelectedImage(newImage);

    setTimeout(() => {
      setShowOriginal(false);
      setTimeout(() => setRunning(true), 1500); // Start timer after scramble animation
    }, 2000);
  };

  useEffect(() => {
    startNewGame(); // Initialize the game on mount
  }, []);
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume; // ✅ Sync volume with state
    }
  }, [volume]);
  

  // Timer logic
  useEffect(() => {
    let interval;
    if (running && !isSolved) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running, isSolved]);

  // Format time to MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  if (!selectedImage) return null;

  return (
    <>
      <audio ref={audioRef} src={backgroundMusic} loop />
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          overflow: "hidden",
        }}
        onClick={handleUserInteraction} // ✅ Start audio on first click
      >
        <Button
          onClick={() => setOpenBackModal(true)}
          sx={{
            position: "absolute",
            top: "1%",
            left: "1%",
            backgroundColor: "#FF5733",
            color: "white",
            fontSize: "18px",
            fontWeight: "bold",
            padding: "8px 16px",
            borderRadius: "12px",
            "&:hover": { backgroundColor: "#E74C3C" },
          }}
        >
          ⬅ Back
        </Button>

   {/* Settings Button (Bottom Left) */}
<IconButton
  onClick={() => setOpenSettings(true)}
  sx={{
    position: "absolute",
    bottom: "20px",
    left: "20px", // ✅ Move to the left side
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    color: "white",
    padding: "10px",
    borderRadius: "50%",
    "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.8)" },
  }}
>
  <SettingsIcon fontSize="large" />
</IconButton>

{/* Settings Modal */}
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
    <Typography sx={{ fontSize: "22px", fontWeight: "bold", color: "#3e2723" }}>
      Settings
    </Typography>

    <Box sx={{ width: "100%", marginTop: "20px" }}>
      <Typography sx={{ fontSize: "16px", fontWeight: "bold", color: "#3e2723" }}>
        Volume
      </Typography>
      <Slider
  value={volume}
  min={0}
  max={1}
  step={0.01}
  onChange={(event, newVolume) => {
    setVolume(newVolume); // ✅ Update the volume state
    if (audioRef.current) {
      audioRef.current.volume = newVolume; // ✅ Apply volume change to audio element
    }
  }}
  sx={{ color: "#FF5733" }}
/>

    </Box>
  </Box>
</Modal>

        {/* ✅ Timer in Bottom-Right Corner */}
        <Box
          sx={{
            position: "absolute",
            bottom: "80px",
            right: "30px",
            backgroundColor: "rgba(255, 228, 196, 0.8)",
            color: "#3e2723",
            fontSize: "22px",
            fontWeight: "bold",
            padding: "10px 20px",
            borderRadius: "12px",
            boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: "80px",
          }}
        >
          ⏳ {formatTime(time)}
        </Box>

        {/* ✅ New Game Button Below Timer */}
        <Button
          onClick={startNewGame}
          variant="contained"
          sx={{
            position: "absolute",
            bottom: "20px",
            right: "30px",
            backgroundColor: "#f4d03f",
            color: "#3e2723",
            fontSize: "18px",
            fontWeight: "bold",
            padding: "10px 20px",
            borderRadius: "12px",
            boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.3)",
            "&:hover": { backgroundColor: "#e1c038" },
          }}
        >
          🔄 New Game
        </Button>

        {/* ✅ Bordered Reference Image in Top-Right Corner */}
        <Box
          sx={{
            position: "absolute",
            top: "50px",
            right: "20px",
            width: "150px",
            height: "150px",
            backgroundColor: "#f4d03f",
            padding: "8px",
            borderRadius: "12px",
            boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            src={selectedImage}
            alt="Reference Image"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </Box>

        {/* Puzzle Board + Jigsaw Puzzle Combined */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "600px",
            backgroundImage: `url(${puzzleBoard})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            overflow: "hidden",
          }}
        >
          {/* Show Original Image First */}
          {showOriginal && (
            <motion.img
              src={selectedImage}
              alt="Pre-Show Image"
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                top: "3%",
                objectFit: "cover",
              }}
            />
          )}

          {/* Jigsaw Puzzle with Scatter Effect */}
          {!showOriginal && (
            <motion.div
              initial={{ opacity: 0, scale: 1.5 }}
              animate={scatter ? { opacity: 0 } : { opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              style={{
                position: "absolute",
                width: "170%",
                height: "170%",
                left: "-35%",
                top: "5%",
              }}
            >
              <JigsawPuzzle
                imageSrc={selectedImage}
                rows={4}
                columns={2}
                onSolved={() => {
                  if (!gameSavedRef.current) { // ✅ Prevent multiple saves
                    setIsSolved(true);
                    setScatter(true);
                    setRunning(false);
                    sendGameData(1); // ✅ Save only once
                    setTimeout(() => setOpenModal(true), 1000);
                  }
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  background: "none",
                  outline: "none",
                }}
              />
            </motion.div>
          )}

          {/* Scatter Effect on Puzzle Completion */}
          {scatter &&
            [...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                animate={{
                  opacity: 0,
                  x: i % 2 === 0 ? 300 : -300,
                  y: i < 2 ? -300 : 300,
                  rotate: 360,
                }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${selectedImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            ))}

          {/* ✅ Show Completed Image After Puzzle is Solved */}
          {isSolved && (
            <motion.img
              src={selectedImage}
              alt="Completed Puzzle"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                top: "0",
                left: "0",
              }}
            />
          )}

          {/* ✅ Modal for Replay Confirmation */}
          <Modal open={openModal} onClose={() => setOpenModal(false)}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "400px",
                backgroundColor: "rgba(255, 228, 196, 0.95)",
                padding: "20px",
                borderRadius: "12px",
                textAlign: "center",
                boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.3)",
              }}
            >
              <Typography
                sx={{ fontSize: "22px", fontWeight: "bold", color: "#3e2723", marginBottom: "15px" }}
              >
                Would you like to play again?
              </Typography>
              <Button
                onClick={() => {
                  window.location.reload(); // ✅ Refresh the page only
                }}
                sx={{
                  backgroundColor: "#4CAF50",
                  color: "white",
                  fontSize: "18px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  marginRight: "10px",
                  "&:hover": { backgroundColor: "#45A049" },
                }}
              >
                Yes
              </Button>

              <Button
                onClick={() => navigate("/")}
                sx={{
                  backgroundColor: "#E74C3C",
                  color: "white",
                  fontSize: "18px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  "&:hover": { backgroundColor: "#C0392B" },
                }}
              >
                No
              </Button>
            </Box>
          </Modal>

          <Modal open={openBackModal} onClose={() => setOpenBackModal(false)}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "400px",
                backgroundColor: "rgba(255, 228, 196, 0.95)",
                padding: "20px",
                borderRadius: "12px",
                textAlign: "center",
                boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.3)",
              }}
            >
              <Typography
                sx={{ fontSize: "22px", fontWeight: "bold", color: "#3e2723", marginBottom: "15px" }}
              >
                Would you go back to the main screen?
              </Typography>

              <Button
                onClick={() => {
                  sendGameData(0); // ✅ Save game with isCompleted: 0
                  setTimeout(() => navigate("/"), 500); // ✅ Navigate to home after saving
                }}
                sx={{
                  backgroundColor: "#4CAF50",
                  color: "white",
                  fontSize: "18px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  marginRight: "10px",
                  "&:hover": { backgroundColor: "#45A049" },
                }}
              >
                Yes
              </Button>

              <Button
                onClick={() => setOpenBackModal(false)}
                sx={{
                  backgroundColor: "#E74C3C",
                  color: "white",
                  fontSize: "18px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  "&:hover": { backgroundColor: "#C0392B" },
                }}
              >
                No
              </Button>
            </Box>
          </Modal>

         

        </Box>
      </Box>
    </>
  );
};

export default Hard;