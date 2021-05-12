import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from '../../shared/components/UIElements/Card'
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";

import "./FormPlace.css";
import { useForm } from "../../shared/hooks/form-hook";

const Sluchayni = [
  {
    id: "p1",
    title: "Mega planet",
    description: "Juda ajoyib gipermarket",
    imageUrl:
      "https://www.gazeta.uz/media/img/2019/11/sOVX4N15737319350425_b.jpg",
    address: "Tashkent, Uzbekistan",
    location: {
      lat: 32.4232,
      lng: -46.043,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Somsaxona",
    description: "Somsachi nomi bilan tanilgan dokon",
    imageUrl:
      "https://avatars.mds.yandex.net/get-altay/3629247/2a00000175ec4821522382c46848d895f7fc/XXXL",
    address: "Buka, Tashkent, Uzbekistan",
    location: {
      lat: 32.4232,
      lng: -46.043,
    },
    creator: "u2",
  },
];

const UpdatePlace = () => {
  const [isLoading, setIsLoading] = useState(true);
  const placeId = useParams().placeId;

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const identifiedPlace = Sluchayni.find((p) => p.id === placeId);

  useEffect(() => {
    if (identifiedPlace) {
      setFormData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: true,
          },
          description: {
            value: identifiedPlace.description,
            isValid: true,
          },
        },
        true
      );
    }

    setIsLoading(false);
  }, [identifiedPlace]);

  const placeUpdateHandler = (e) => {
    e.preventDefault();

    console.log(formState.inputs);
  };

  if (!identifiedPlace) {
    return (
      <div className="center">
        <Card>
          <h2>Bunday joy topilmadi</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Yuklanmoqda...</h2>
      </div>
    );
  }
  return (
    <form className="place-form" onSubmit={placeUpdateHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="iltimos togri nom kiriting"
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="iltimos togri izoh kiriting (min. 5 harf)"
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        Update place
      </Button>
    </form>
  );
};

export default UpdatePlace;
