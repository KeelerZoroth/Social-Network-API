import { Router } from 'express';
const router = Router();
import { getThoughts, getSingleThought, createThought, updateThought, deleteThought, createThoughtReaction, deleteThoughtReaction } from '../../controllers/thoughtController.js';


// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(createThoughtReaction).delete(deleteThoughtReaction);


export default router;