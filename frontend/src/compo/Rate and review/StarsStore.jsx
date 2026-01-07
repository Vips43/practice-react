import { create } from "zustand";

export const StarsStore = create((set) => ({
 rating: null,
 hover: 0,

 setRating: (num) => set({ rating: num }),
 setHover: (num) => set({ hover: num }),
}));

const images = ["/male.jpg", "/female.jpg"];
export const useUserStore = create((set) => ({
 user: "",
 comment: "",
 timeStamp: new Date().toLocaleString(),
 randImages: images[Math.floor(Math.random() * images.length)],
 comments: JSON.parse(localStorage.getItem("comments")) || [],

 setUser: (newUser) => set({ user: newUser }),
 setComment: (newComment) => set({ comment: newComment }),

 addComment: () =>
  set((state) => {
   const updated = [
    ...state.comments,
    { username: state.user, usercomment: state.comment, userprofile:state.randImages,time: state.timeStamp },
   ];
   console.log("Latest comment:", updated);
   return {
    comments: updated,
    user: "",
    comment: "",
   };
  }),
}));
