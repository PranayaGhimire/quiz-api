import Quiz from "../models/Quiz.js"

// Create Quiz
export const createQuiz = async (req,res) => {
    try {
        const quiz = await Quiz.create(req.body);
        res.status(201).json({
            message:"Quiz Created Successfully",
            data:quiz
        });
    } catch (error) {
        res.status(500).json({
            message:error.message
        });
    }
};

// Get All Quizzes
export const getQuizzes = async (req,res) => {
    try {
        const quizzes = await Quiz.find();
        res.status(201).json({
            message:"Quizzes Fetched Successfully",
            data:quizzes
        });
    } catch (error) {
        res.status(500).json({
            message:error.message
        });
    }
};

// Get Single Quiz
export const getQuiz = async (req,res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if(!quiz) return res.status(404).json({message:"Quiz Not Found"});
        res.status(201).json({
            message:"Quiz Fetched Successfully",
            data:quiz
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        });
    }
};

// Submit Answers
export const submitQuiz = async (req,res) => {
    try {
        const { answers } = req.body; // array of selected option indexes
        const quiz = await Quiz.findById(req.params.id);
        if(!quiz) return res.status(404).json({message:"Quiz Not Found"});

        let score=0;
        quiz.questions.forEach((q,index) => {
             if(answers[idx] === q.correctAnswer)
                score++
        });
        res.status(201).json({
            message:"Quiz Submitted Successfully",
            score,
            total: quiz.questions.length
        })
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

// Delete Quiz
export const deleteQuiz = async (req,res) => {
    try {
        const quiz = await Quiz.findByIdAndDelete(req.params.id);
        if(!quiz) return res.status(404).json({message:"Quiz Not Found"});
        res.status(201).json({message:"Quiz deleted"});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}
