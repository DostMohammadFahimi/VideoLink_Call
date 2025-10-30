import { Metadata } from "next";
import MyMeetingsPage from "./MyMeetingsPage";

export const metadata: Metadata = {
  title: "My Meeting",
};

export default function Page(){
    return (
        <div>
            <MyMeetingsPage />
        </div>
    )
}
