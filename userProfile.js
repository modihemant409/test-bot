// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

class UserProfile {
  constructor(name, age, email, isProfileCompleted) {
    this.name = name || "User";
    this.age = age || null;
    this.email = email || null;
    this.isProfileCompleted = isProfileCompleted || false;
  }
}

module.exports.UserProfile = UserProfile;
