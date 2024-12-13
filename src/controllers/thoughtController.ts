import Thought from '../models/Thought.js';
import { Request, Response } from 'express';
import User from '../models/User.js';

  export const getThoughts = async(_req: Request, res: Response) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  export const getSingleThought = async(req: Request, res: Response) => {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v');

      if (!thought) {
         res.status(404).json({ message: 'No thought with that ID' });
      } else {
        res.json(thought);
      }
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  }

  // create a new Thought
  export const createThought = async(req: Request, res: Response) => {
    try {
      if(!req.body.userId){
        res.status(400).json({message: "userId is required"});
        return
      }
      const dbThoughtData = await Thought.create(req.body);
      await User.findByIdAndUpdate(req.body.userId, {$push: {thoughts: dbThoughtData._id}});
      res.json(dbThoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // create a Thought reaction
  export const createThoughtReaction = async(req: Request, res: Response) => {
    try {
      const dbThoughtData = await Thought.findByIdAndUpdate(req.params.thoughtId, {$push: {reactions: req.body}}, {new: true});
      res.json(dbThoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // update a Thought
  export const updateThought = async(req: Request, res: Response) => {
    try {
      const dbThoughtData = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
      res.json(dbThoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  }



    // delete a Thought
    export const deleteThought = async(req: Request, res: Response) => {
      try {
        const dbThoughtData = await Thought.findByIdAndDelete(req.params.thoughtId);
        await User.findOneAndUpdate({username: dbThoughtData?.username}, {$pull: {thoughts: req.params.thoughtId}});
        res.json(dbThoughtData);
      } catch (err) {
        res.status(500).json(err);
      }
    }

    // delete a Thought reaction
    export const deleteThoughtReaction = async(req: Request, res: Response) => {
      try {
        const dbThoughtData = await Thought.findByIdAndUpdate(req.params.thoughtId, {$pull: {reactions: {reactionId: req.body.reactionId}}}, {new: true});
        res.json(dbThoughtData);
      } catch (err) {
        res.status(500).json(err);
      }
    }
