import { prisma } from "../config/db.js";

const addToWatchList = async (req, res) => {
    const { movieId, status, rating, notes } = req.body;

    // Verify movie exists
    const movie = await prisma.movie.findUnique({
        where: { id: movieId }
    });

    if (!movie) {
        return res.status(404).json({
            error: "Movie not found"
        });
    }
    // Check if already added
    const existingInWatchList = await prisma.watchListItem.findUnique({
        where: {
            userId_movieId: {
                userId: req.user.id,
                movieId: movieId
            }
        }
    });

    if(existingInWatchList){
         return res.status(400).json({
            error: "Movie already in the watchlist"
        });
    }

    const watchListItem = await prisma.watchListItem.create({
        data: {
            userId: req.user.id,
            movieId,
            status: status || "PLANNED",
            rating,
            notes
        }
    })

    res.status(200).json({
        status: "success",
        data: {
            watchListItem
        }
    });
};

const removeFromWatchList = async (req, res) => {
    // Find watchlist item and verify ownership
    const watchListItem = prisma.watchListItem.findUnique({
        where: { id: req.params.id }
    });

    if(!watchListItem){
        return res.status(404).json({
            error: "Watchlist item not found"
        });
    }

    if(watchListItem.userId !== req.user.id){
        return res.status(403).json({
            error: "Not allowed to remove this watchlist item"
        });
    }

    await prisma.watchListItem.delete({
        where: { id: req.params.id }
    });

     res.status(200).json({
        status: "success",
        message: "Watchlist Item Removed id: " + watchListItem.id
    });
}

export { addToWatchList, removeFromWatchList }