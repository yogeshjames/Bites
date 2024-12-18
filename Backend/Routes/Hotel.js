const express = require('express');
const router = express.Router();
const Hotel = require('../models/Hotel'); 

// Route to get all hotels
router.get('/getall', async (req, res) => {
    console.log('GET /api/hotel/getall route hit');
  try {
    const hotels = await Hotel.find();
    
    
    res.status(200).json({
      success: true,
      data: hotels,
    });
  } catch (error) {
    console.error('Error fetching hotels:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch hotels. Please try again.',
    });
  }
});


router.get('/details/:hotelId', async (req, res) => {
  const { hotelId } = req.params;
  try {
    const hotel = await Hotel.findOne({ hotelId });
    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found.',
      });
    }
    res.status(200).json({
      success: true,
      data: hotel,
    });
  } catch (error) {
    console.error('Error fetching hotel details:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch hotel details. Please try again.',
    });
  }
});  

module.exports = router;
