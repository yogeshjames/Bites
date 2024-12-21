import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, TextField, Button, CircularProgress, Rating } from "@mui/material";
import Stars from './Stars'; // Import the custom Radio component

const Reviews = ({ hotelId }) => {
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/hotel/reviews/${hotelId}`
        );
        setReviews(response.data.data);
      } catch (err) {
        setError("Failed to load reviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [hotelId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userId = localStorage.getItem("clientId");
    if (!userId) {
      setSubmitError("You must be logged in to submit a review.");
      return;
    }

    setSubmitLoading(true);
    setSubmitError("");
    try {
      const response = await axios.post(
        `http://localhost:5000/api/hotel/reviews/${hotelId}`,
        { userId, comment, rating }
      );

      setSuccess("Your review has been submitted successfully.");
      setComment("");
      setRating(0);
      setReviews([...reviews, response.data.newReview]);
    } catch (err) {
      setSubmitError("Failed to submit review.");
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ marginTop: 4, fontFamily: "'Merriweather', serif", maxWidth: "800px", margin: "auto" }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, color: "#333", marginBottom: 3 }}>
        Reviews
      </Typography>

      {reviews.length > 0 ? (
        <Box>
          {reviews.map((review, index) => (
            <Box
              key={index}
              sx={{
                marginBottom: 3,
                padding: 3,
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                background: "#ffffff",
                textAlign: "left",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 1 }}>
                {review.user}
              </Typography>
              <Rating value={review.rating} readOnly />
              <Typography variant="body2" sx={{ marginTop: 1, color: "#555" }}>
                {review.comment}
              </Typography>
            </Box>
          ))}
        </Box>
      ) : (
        <Typography>No reviews available.</Typography>
      )}

      <Box sx={{ marginTop: 5, padding: 3, background: "#f9f9f9", borderRadius: "10px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
        <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 2 }}>
          Write a Review
        </Typography>

        {success && <Typography color="green">{success}</Typography>}
        {submitError && <Typography color="error">{submitError}</Typography>}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Your Comment"
            multiline
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            fullWidth
            required
            sx={{ marginBottom: 2 }}
          />

          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="body1">Rating</Typography>
            <Stars setRating={setRating} />
          </Box>

          <Button type="submit" variant="contained" disabled={submitLoading}>
            {submitLoading ? <CircularProgress size={24} /> : "Submit Review"}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Reviews;
