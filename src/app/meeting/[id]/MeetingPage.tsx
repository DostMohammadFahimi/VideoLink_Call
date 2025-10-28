"use client";

import { buttonClassName } from "@/components/‌Button";
import useLoadCall from "@/hooks/useLoadCall";
import useStreamCall from "@/hooks/useStreamCall";
import { useUser } from "@clerk/nextjs";
import {
  Call,
  CallControls,
  reactionType,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  useCall,
  useCallStateHooks,
  useStreamVideoClient,
} from "@stream-io/video-react-sdk";
import { FunctionSquareIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface MeetingPageProps {
  id: string;
}

export default function MeetingPage({ id }: MeetingPageProps) {
  const { user, isLoaded: userLoaded } = useUser();

  const { call, callLoading } = useLoadCall(id);

  if (!userLoaded || callLoading) {
    return <Loader2 className="mx-auto animate-spin" />;
  }

  if (!call) {
    return (
      <p className="text-center font-bold text-red-500">Call not found!</p>
    );
  }

  const notAllowToJoin =
    call.type === "private-meeting" &&
    (!user || !call.state.members.find((m) => m.user.id === user.id));

  if (notAllowToJoin) {
    return (
      <p className="text-center font-semibold text-red-400">
        You are not allowed to join to this meetig!
      </p>
    );
  }

  return (
    <StreamCall call={call}>
      <StreamTheme>
        <MeetingScrean />
      </StreamTheme>
    </StreamCall>
  );
}

function MeetingScrean() {
  const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();

  const callEndedAt = useCallEndedAt();
  const CallStartsAt = useCallStartsAt();

  const callIsInfeature = CallStartsAt && new Date(CallStartsAt) > new Date();

  const callHasEnded = !!callEndedAt;

  if (callHasEnded) {
    return <MeetingEndedScreen />;
  }

  if (callIsInfeature) {
    return <UpcomingMeetingScreen />;
  }

  return <div>Call UI</div>;
}

function UpcomingMeetingScreen() {
  const call = useStreamCall();

  return (
    <div className="flex flex-col items-center gap-6">
      <p>
        This meeting has not started yet. It will start at{" "}
        <span className="font-bold">
          {call.state.startsAt?.toLocaleString()}
        </span>
      </p>
      {call.state.custom.description && (
        <p>
          Description:{" "}
          <span className="font-bold">{call.state.custom.description}</span>
        </p>
      )}
      <Link href="/" className={buttonClassName}>
        Go Home
      </Link>
    </div>
  );
}

function MeetingEndedScreen() {
  return (
    <div className="flex flex-col items-center gap-6">
      <p className="font-bold">This meeting has ended</p>
      GO Home<Link href="/" className={buttonClassName}></Link>
    </div>
  );
}
