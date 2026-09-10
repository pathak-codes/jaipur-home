"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";
import type { DemoCustomer, DemoProvider, DemoRequest, DemoJob, DemoTransaction, DemoComplaint, DemoAdminMetrics } from "./types";
import { DEMO_CUSTOMER, DEMO_PROVIDERS, DEMO_PROVIDER_TRANSACTIONS, DEMO_CUSTOMER_WALLET_TRANSACTIONS, DEMO_COMPLAINTS, DEMO_ADMIN_METRICS } from "../data/demo";

interface DemoState {
  customer: DemoCustomer;
  activeRequest: DemoRequest | null;
  matchedProvider: DemoProvider | null;
  providerAvailability: "available" | "unavailable";
  incomingRequest: DemoRequest | null;
  activeJob: DemoJob | null;
  timerSeconds: number;
  trackingProgress: number;
  currentServiceId: string | null;
  customerWalletTransactions: DemoTransaction[];
  providerTransactions: DemoTransaction[];
  providerWalletBalance: number;
  complaints: DemoComplaint[];
  adminMetrics: DemoAdminMetrics;
  recentJobs: DemoJob[];
  completedRequests: DemoRequest[];
}

type DemoAction =
  | { type: "SET_SERVICE"; serviceId: string }
  | { type: "SUBMIT_REQUEST"; description: string; location: { address: string; lat: number; lng: number } }
  | { type: "START_MATCHING" }
  | { type: "PROVIDER_ACCEPTED"; providerId: string }
  | { type: "START_TRACKING" }
  | { type: "UPDATE_TRACKING"; progress: number }
  | { type: "ARRIVED" }
  | { type: "TOGGLE_AVAILABILITY" }
  | { type: "INCOMING_REQUEST"; request: DemoRequest }
  | { type: "ACCEPT_REQUEST" }
  | { type: "REJECT_REQUEST" }
  | { type: "TICK_TIMER" }
  | { type: "START_JOB_JOURNEY" }
  | { type: "ARRIVED_JOB" }
  | { type: "COMPLETE_JOB" }
  | { type: "MAKE_PAYMENT"; method: "online" | "cash" }
  | { type: "ADD_REVIEW"; rating: number; comment?: string }
  | { type: "RESET" };

const initialState: DemoState = {
  customer: DEMO_CUSTOMER,
  activeRequest: null,
  matchedProvider: null,
  providerAvailability: "unavailable",
  incomingRequest: null,
  activeJob: null,
  timerSeconds: 30,
  trackingProgress: 0,
  currentServiceId: null,
  customerWalletTransactions: DEMO_CUSTOMER_WALLET_TRANSACTIONS,
  providerTransactions: DEMO_PROVIDER_TRANSACTIONS,
  providerWalletBalance: 2151.8,
  complaints: DEMO_COMPLAINTS,
  adminMetrics: DEMO_ADMIN_METRICS,
  recentJobs: [],
  completedRequests: [],
};

function demoReducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case "SET_SERVICE":
      return { ...state, currentServiceId: action.serviceId };

    case "SUBMIT_REQUEST":
      return {
        ...state,
        activeRequest: {
          id: `r-${Date.now()}`,
          customerId: state.customer.id,
          serviceId: state.currentServiceId!,
          description: action.description,
          location: action.location,
          status: "matching",
          createdAt: new Date(),
        },
      };

    case "START_MATCHING":
      return state.activeRequest
        ? { ...state, activeRequest: { ...state.activeRequest, status: "matching" } }
        : state;

    case "PROVIDER_ACCEPTED": {
      const provider = DEMO_PROVIDERS.find((p) => p.id === action.providerId)!;
      const serviceId = state.currentServiceId ?? state.activeRequest?.serviceId ?? "s1";
      return {
        ...state,
        matchedProvider: provider,
        activeRequest: state.activeRequest
          ? { ...state.activeRequest, status: "accepted" }
          : null,
        activeJob: {
          id: `JHS-${Math.floor(Math.random() * 900) + 100}`,
          serviceRequestId: state.activeRequest?.id ?? `r-${Date.now()}`,
          providerId: provider.id,
          customerId: state.customer.id,
          serviceId,
          status: "ACCEPTED",
          acceptedAt: new Date(),
          etaMinutes: 8,
          distanceKm: 2.3,
          amount: DEMO_PROVIDERS.find((p) => p.id === action.providerId)
            ? 299
            : undefined,
        },
      };
    }

    case "START_TRACKING":
      return { ...state, trackingProgress: 0 };

    case "UPDATE_TRACKING":
      return { ...state, trackingProgress: Math.min(100, action.progress) };

    case "ARRIVED":
      return {
        ...state,
        trackingProgress: 100,
        activeJob: state.activeJob
          ? { ...state.activeJob, status: "ARRIVED", arrivedAt: new Date() }
          : null,
      };

    case "TOGGLE_AVAILABILITY":
      return {
        ...state,
        providerAvailability:
          state.providerAvailability === "available" ? "unavailable" : "available",
      };

    case "INCOMING_REQUEST":
      return { ...state, incomingRequest: action.request, timerSeconds: 30 };

    case "ACCEPT_REQUEST": {
      const provider = DEMO_PROVIDERS[0];
      return {
        ...state,
        incomingRequest: null,
        activeJob: {
          id: `JHS-${Math.floor(Math.random() * 900) + 100}`,
          serviceRequestId: state.incomingRequest?.id ?? "r1",
          providerId: provider.id,
          customerId: state.customer.id,
          serviceId: state.incomingRequest?.serviceId ?? "s1",
          status: "ACCEPTED",
          acceptedAt: new Date(),
          etaMinutes: 8,
          distanceKm: 2.3,
        },
      };
    }

    case "REJECT_REQUEST":
      return { ...state, incomingRequest: null };

    case "TICK_TIMER":
      return { ...state, timerSeconds: Math.max(0, state.timerSeconds - 1) };

    case "START_JOB_JOURNEY":
      return state.activeJob
        ? { ...state, activeJob: { ...state.activeJob, status: "ON_THE_WAY" } }
        : state;

    case "ARRIVED_JOB":
      return state.activeJob
        ? { ...state, activeJob: { ...state.activeJob, status: "ARRIVED", arrivedAt: new Date() } }
        : state;

    case "COMPLETE_JOB":
      return state.activeJob
        ? {
          ...state,
          activeJob: {
            ...state.activeJob,
            status: "COMPLETED",
            completedAt: new Date(),
          },
        }
        : state;

    case "MAKE_PAYMENT":
      return state.activeJob
        ? {
          ...state,
          activeJob: {
            ...state.activeJob,
            status: "PAID",
            paymentMethod: action.method,
            amount: state.activeJob.amount ?? 299,
          },
        }
        : state;

    case "ADD_REVIEW":
      return state.activeJob
        ? { ...state, activeJob: { ...state.activeJob, status: "REVIEWED" } }
        : state;

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

const DemoContext = createContext<{
  state: DemoState;
  dispatch: React.Dispatch<DemoAction>;
} | null>(null);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(demoReducer, initialState);
  return (
    <DemoContext.Provider value={{ state, dispatch }}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo must be used within DemoProvider");
  return ctx;
}
