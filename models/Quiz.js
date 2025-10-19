import mongoose from "mongoose"

const questionSchema = new mongoose.Schema({
    question:{
        type: String,
        required:true
    },
    options:[
        {
            type:String,
            required:true
        }
    ],
    // Index of correct option
    correctAnswer:{
        type:Number,
        required:true
    }
});

const quizSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    questions:[questionSchema]
}, {timestamps:true});

export default mongoose.model("Quiz",quizSchema);