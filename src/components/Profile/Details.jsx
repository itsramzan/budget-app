import React from "react";
import moment from "moment";
import {
  IoCalendarOutline,
  IoPersonOutline,
  IoCafeOutline,
  IoMailOutline,
  IoPhonePortraitOutline,
  IoLocationOutline,
  IoBagAddOutline,
  IoBagRemoveOutline,
  IoBagCheckOutline,
} from "react-icons/io5";
import Item from "./Item";
import budgetsStat from "../../utils/budgetsStat";
import UpdateDetailsModal from "./UpdateDetailsModal";

const Details = ({ data }) => {
  const { gender, dateOfBirth, email, mobile, address, budgets, createdAt } =
    data;

  const { totalIncome, totalExpense, totalSaving } = budgetsStat(budgets);

  return (
    <>
      <div className="flex justify-between items-center">
        <h3 className="text-xl text-primary font-semibold">User Details</h3>
        <UpdateDetailsModal data={data} />
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        <Item
          Icon={IoCalendarOutline}
          text="Joined At"
          value={moment(new Date(createdAt).getTime()).format("MMM Do YY")}
        />
        <Item Icon={IoPersonOutline} text="Gender" value={gender} />
        <Item
          Icon={IoCafeOutline}
          text="Date of Birth"
          value={
            dateOfBirth &&
            moment(new Date(dateOfBirth).getTime()).format("MMM Do YY")
          }
        />
        <Item Icon={IoMailOutline} text="Email" value={email} />
        <Item Icon={IoPhonePortraitOutline} text="Mobile" value={mobile} />
        <Item Icon={IoLocationOutline} text="Address" value={address} />
        <Item
          Icon={IoBagAddOutline}
          text="Income"
          value={totalIncome.toString()}
        />
        <Item
          Icon={IoBagRemoveOutline}
          text="Expense"
          value={totalExpense.toString()}
        />
        <Item
          Icon={IoBagCheckOutline}
          text="Saving"
          value={totalSaving.toString()}
        />
      </div>
    </>
  );
};

export default Details;
