const Hotel = require("../model/hotel");
const Room = require("../model/room");

const createHotel = async (req, res) => {
    const newHotel = new Hotel (req.body);
    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch (error) {
        console.log(err)
        res.status(500).json({error: error.message})
    }
};

const getHotels = async (req, res) => {
    const {min, max, ...others} = req.query;

    try {
        const hotels = await Hotel.find({
            ...others,
            cheapestPrice: { $gt: min| 1, $lt: max || 999 } 
        }).limit(req.query.limit)

        res.status(200).json(hotels)
    } catch (error) {
        console.log(err)
        res.status(500).json({error: error.message})
    }
};

const countByCity = async (req, res,) => {
    const cities = req.query.cities.split(",")

    try {
        const list = await Promise.all(
            cities.map((city) => {
                return Hotel.countDocuments({ city: city })
            })
        )
        res.status(200).json(list)
    } catch (error) {
        console.log(err)
        res.status(500).json({error: error.message})
    }
};

const countHotelByType = async (req, res) => {
    try {
        const hotelCount = await Hotel.countDocuments({ type:"hotel" })
        const apartmentCount = await Hotel.countDocuments({ type:"apartment" })
        const resortCount = await Hotel.countDocuments({ type:"resort" })
        const villaCount = await Hotel.countDocuments({ type:"villa" })
        const cabinCount = await Hotel.countDocuments({ type:"cabin" })
        res.status(200).json([
            {type: "hotel", count: hotelCount},
            {type: "apartment", count: apartmentCount},
            {type: "resort", count: resortCount},
            {type: "villa", count: villaCount},
            {type: "cabin", count: cabinCount}
        ])

    } catch (error) {
        console.log(err)
        res.status(500).json({error: error.message})
    }
};

const getHotelRooms = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        const roomList = await Promise.all(
        hotel.rooms.map((room) => {
            return Room.findById(room);
        })
    )

    res.status(200).json(roomList)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
};

const deleteHotel = async (req, res) => {
    const {tittle} = req.params;
    try {
        const deletedHotel = await Hotel.findByIdAndDelete(tittle);
        if(!deletedHotel){
            return res.status(404).json({message: "Hotel Not Found"})
        }
        return res.status(200).json(deletedHotel)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.message})
    }
};

