import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
    age : ?Nat;
    notes : ?Text;
  };

  type DeviceType = {
    #phone;
    #tablet;
    #computer;
  };

  type ScreenTimeEntry = {
    device : DeviceType;
    minutes : Nat;
    timestamp : Time.Time;
  };

  type UserData = {
    riskScore : ?Nat;
    lastAssessment : ?Time.Time;
    screenTimeEntries : [ScreenTimeEntry];
  };

  type HealthMetrics = {
    bmi : ?Float;
    exerciseHoursPerWeek : ?Float;
    sleepHoursPerNight : ?Float;
    eyeStrainSymptoms : ?Bool;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let userData = Map.empty<Principal, UserData>();
  let healthMetrics = Map.empty<Principal, HealthMetrics>();

  // --- User Profile Functions (required by frontend) ---

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // --- Health & Screen Time Functions ---

  public shared ({ caller }) func updateRiskScore(score : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can perform this action");
    };
    let data = switch (userData.get(caller)) {
      case (null) {
        {
          riskScore = ?score;
          lastAssessment = ?Time.now();
          screenTimeEntries = [];
        };
      };
      case (?existing) {
        {
          riskScore = ?score;
          lastAssessment = ?Time.now();
          screenTimeEntries = existing.screenTimeEntries;
        };
      };
    };
    userData.add(caller, data);
  };

  public query ({ caller }) func getRiskScore() : async ?Nat {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can perform this action");
    };
    switch (userData.get(caller)) {
      case (null) { null };
      case (?data) { data.riskScore };
    };
  };

  public shared ({ caller }) func addScreenTimeEntry(device : DeviceType, minutes : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can perform this action");
    };
    let entry : ScreenTimeEntry = {
      device;
      minutes;
      timestamp = Time.now();
    };
    let data = switch (userData.get(caller)) {
      case (null) {
        {
          riskScore = null;
          lastAssessment = null;
          screenTimeEntries = [entry];
        };
      };
      case (?existing) {
        {
          riskScore = existing.riskScore;
          lastAssessment = existing.lastAssessment;
          screenTimeEntries = existing.screenTimeEntries.concat([entry]);
        };
      };
    };
    userData.add(caller, data);
  };

  public query ({ caller }) func getScreenTime() : async [ScreenTimeEntry] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can perform this action");
    };
    switch (userData.get(caller)) {
      case (null) { [] };
      case (?data) { data.screenTimeEntries };
    };
  };

  public shared ({ caller }) func submitHealthMetrics(metrics : HealthMetrics) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can perform this action");
    };
    healthMetrics.add(caller, metrics);
  };

  public query ({ caller }) func getHealthMetrics() : async ?HealthMetrics {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can perform this action");
    };
    healthMetrics.get(caller);
  };
};
