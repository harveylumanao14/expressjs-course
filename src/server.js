import express from 'express';
import { config } from 'dotenv';
import { connectDB, disconnectDB } from './config/db.js';

// Import Routes
import movieRoutes from './routes/movieRoutes.js';

config();
connectDB();

const app = express();

//API ROUTES

app.use('/movies', movieRoutes);

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});

// Handled unhandled promise rejections (e.g., database connection errors)
process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection", err);
    server.close(async () => {
        await disconnectDB();
        process.exit(1);
    });
});

// Handled uncaught exceptions
process.on("uncaughtException", async (err) => {
    console.error("Unhandled Exception", err);
    await disconnectDB();
    process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", async (err) => {
    console.log("SIGTERM received, shutting down gracefully");
    server.close(async () => {
        await disconnectDB();
        process.exit(1);
    });
});



//AUTH - login, logout, sigin, signup
//MOVIE - getting all movie records
//USER - user profile, preferences, etc.
//WATCHLIST - list of the movies based on the user and movie