import { redirect } from "next/navigation";

export default function HomePage():void {

  redirect("/dashboard/counter");

  // return (
  //   <>
  //       <h1>Dashboard App</h1>
  //   </>
  // );
}
