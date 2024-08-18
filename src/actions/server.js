"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import userSchema from "@/model/userSchema";
import dbConnect from "@/app/lib/db";


export const login = async (formData) => {
  const user = { email: formData.get("email") };

  const expiresIn = new Date(Date.now() + 1000 * 60 * 60);

  cookies().set("session", JSON.stringify(user), {
    expires: expiresIn,
    httpOnly: true,
    path: "/",
  });

  await addNewUser(formData.get("email"))
  redirect("/")
};


export const logout = async () => {
  cookies().set("session", "", { expires: new Date(0) })
}

export const getSession = () => {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) {
    console.log("No session found");
    return null
  }

  const user = JSON.parse(sessionCookie);
  console.log("User session data:", user);

  return user;
};


//adding new user to database

const addNewUser = async (email) => {
  try {
    const data = await userSchema.find({ email: email })
    if (data.length > 0) {
      return;
    }
    const newUser = new userSchema({
      email: email,
      cart: [],
    });
    await newUser.save();  // Await the save operation
    console.log('User added successfully');
  } catch (error) {
    console.error('Error adding user:', error);
  }
};

export const addItemToCart = async (itemId) => {
  try {
    let temp = await getSession();
    const email = temp.email
    if (!email) {
      console.log("No email found in session");
      return;
    }

    // Find the user's current cart data
    const data = await userSchema.findOne({ email: email });

    if (!data) {
      console.log("User not found");
      return;
    }

    // Update the cart array
    let arr = data.cart;
    arr.push({ id: itemId, quantity: 1 });

    // Update the user's cart
    await userSchema.updateOne(
      { email: email },
      { $set: { cart: arr } }
    );
    console.log("Successfully updated the cart");
  } catch (error) {
    console.error("Error updating the cart:", error);
  }
};

export const getCart = async () => {
  await dbConnect()

  const session = await getSession();
  if (!session) return []

  const email = session.email;

  try {
    const data = await userSchema.findOne({ email: email })

    return data.cart;
  } catch (error) {
    console.log(error);
    return []

  }
}

// incresing the quantity

export const increaseQuantity = async (itemId) => {
  try {

    const session = await getSession();
    const email = session.email;

    const data = await userSchema.findOne({ email: email })
    if (!data) {

      return;
    }

    let arr = data.cart;
    arr.map(item => {
      if (item.id === itemId) {
        item.quantity += 1;
        return;
      }
    })

    await userSchema.updateOne({ email: email }, { $set: { cart: arr } })
    console.log("completed dost");

    return arr;
  }
  catch (e) {
    console.log(e);
    return null;

  }
}
export const decreaseQuantity = async (itemId) => {
  try {

    const session = await getSession();
    const email = session.email;

    const data = await userSchema.findOne({ email: email })
    if (!data) {

      return;
    }

    let arr = data.cart;
    arr.map(item => {
      if (item.id === itemId) {
        item.quantity -= 1;
        return;
      }
    })

    await userSchema.updateOne({ email: email }, { $set: { cart: arr } })
    console.log("completed dost");

    return arr;
  }
  catch (e) {
    console.log(e);
    return null;

  }
}

export const removeItem = async (itemId) => {
  try {
    const session = await getSession();
    const email = session.email;
    const data = await userSchema.findOne({ email: email })
    if (!data) {
      return;
    }

    let arr = data.cart;
    arr = arr.filter(item => item.id !== itemId);
    await userSchema.updateOne({ email: email }, { $set: { cart: arr } })
    console.log("completed dost");

    return arr;

  }
  catch (e) {
    console.log(e);
    return null;

  }
}