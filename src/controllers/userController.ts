import Thought from '../models/Thought.js';
import User from '../models/User.js';
import { Request, Response } from 'express';

  export const getUsers = async(_req: Request, res: Response) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  export const getSingleUser = async(req: Request, res: Response) => {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate("friends")
        .populate("thoughts");

      if (!user) {
         res.status(404).json({ message: 'No user with that ID' });
      } else {
        res.json(user);
      }
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  }

  // create a new user
  export const createUser = async(req: Request, res: Response) => {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // add a friend to a user
  export const addFriendToUser = async(req: Request, res: Response) => {
    try {
      const dbUserData = await User.findByIdAndUpdate(req.params.userId, {$push: {friends: req.params.friendId}}, { new: true });
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // update a user
  export const updateUser = async(req: Request, res: Response) => {
    try {
      const dbUserData = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  }



    // delete a user
    export const deleteUser = async(req: Request, res: Response) => {
      try {
        const dbUserData = await User.findByIdAndDelete(req.params.userId);
        await Thought.deleteMany({_id: {$in: dbUserData?.thoughts}});
        res.json({message: "User deleted"});
      } catch (err) {
        res.status(500).json(err);
      }
    }

  // remove a friend from a user
  export const removeFriendFromUser = async(req: Request, res: Response) => {
    try {
      const dbUserData = await User.findByIdAndUpdate(req.params.userId, {$pull: {friends: req.params.friendId}}, { new: true });
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  }
