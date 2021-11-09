import React from "react";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import CardForm from "./CardForm";


function EditCard({ editCard }) {
  const { cardId } = useParams();
  return (
    <div className="edit-card-container">
      <NavBar page={`Edit Card ${cardId}`} />
      <h3 class="font-weight-bold">Edit Card</h3>
      <CardForm cardFunction={editCard} option={"Edit"} />
    </div>
  );
}

export default EditCard;