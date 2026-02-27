import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface ScreenTimeEntry {
    minutes: bigint;
    device: DeviceType;
    timestamp: Time;
}
export interface UserProfile {
    age?: bigint;
    name: string;
    notes?: string;
}
export interface HealthMetrics {
    bmi?: number;
    sleepHoursPerNight?: number;
    eyeStrainSymptoms?: boolean;
    exerciseHoursPerWeek?: number;
}
export enum DeviceType {
    tablet = "tablet",
    computer = "computer",
    phone = "phone"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addScreenTimeEntry(device: DeviceType, minutes: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getHealthMetrics(): Promise<HealthMetrics | null>;
    getRiskScore(): Promise<bigint | null>;
    getScreenTime(): Promise<Array<ScreenTimeEntry>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitHealthMetrics(metrics: HealthMetrics): Promise<void>;
    updateRiskScore(score: bigint): Promise<void>;
}
