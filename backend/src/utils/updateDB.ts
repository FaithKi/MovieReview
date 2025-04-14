import User from "../models/UserModel.ts";
import Movie from "../models/MovieModel.ts";

export async function updateFieldCount(count: number, field: string, movieId: string, userId: string | undefined) {
    try {
        await User.findByIdAndUpdate(userId, {
            $inc: { [field]: count}
        });
        await Movie.findByIdAndUpdate(movieId, {
            $inc: { [field]: count },
            
        });   
    } catch (error) {
        console.error("Error updating field count:", error);
        
    }
}

export async function updateRating(star: number | null, existingRating: number | null, movieId: string, userId: string | undefined) {
// Fetch user
    try {
        const user = await User.findById(userId);
        const movie = await Movie.findById(movieId);
        if (!user || !movie) {
            console.error("User or Movie not found");
            return;
        }
        // console.log(existingRating, star, user.starStats);
        if (existingRating) {
            const oldStar = existingRating.toFixed(0);
            user.starStats.set(oldStar, (user.starStats.get(oldStar) || 1) - 1);
            movie.starStats.set(oldStar, (movie.starStats.get(oldStar) || 1) - 1);
            movie.vote_sum -= existingRating;
            movie.vote_count--;
        }

            // Add the new star count
        if (star) {
            const newStar = star.toFixed(0);
            user.starStats.set(newStar, (user.starStats.get(newStar) || 0) + 1);
            movie.starStats.set(newStar, (movie.starStats.get(newStar) || 0) + 1);
            movie.vote_sum += star;
            movie.vote_count++;
        }

        // After updating starStats
        user.markModified('starStats');
        const updatedUser = await user.save();
        // console.log("✅ Updated User Star Stats:", updatedUser.starStats);
        movie.markModified('starStats');
        await movie.save();
        console.log("Rating updated successfully");
        
    } catch (error) {
        console.error("Error updating rating:", error); 
    }
}