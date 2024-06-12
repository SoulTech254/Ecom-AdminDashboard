import React, { useEffect, useState } from "react";
import { useGetAUser } from "@/api/UserApi";
import { useParams } from "react-router-dom";

const UserInfoPage = () => {
  const { id } = useParams();
  const { user, isLoadingUser } = useGetAUser(id);

  return (
    <div>
      {isLoadingUser && <div>Loading...</div>}
      {user && (
        <div>
          <h2>User Details</h2>
          <p>First Name: {user.fName}</p>
          <p>Last Name: {user.lName}</p>
          <p>Gender: {user.gender}</p>
          <p>Phone Number: {user.phoneNumber}</p>
          <p>Email: {user.email}</p>
          <p>Date of Birth: {new Date(user.DOB).toLocaleDateString()}</p>
          {/* Add more fields as needed */}
        </div>
      )}
    </div>
  );
};

export default UserInfoPage;
