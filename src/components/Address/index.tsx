//@ts-nocheck
import React, { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";
import FormLabels from "components/ui/FormLabel";

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface GooglePlacesAutocompleteProps {
  onPlaceSelect?: (data: any) => void;
  value: string;
  onChange?: (value: string) => void;
  required?: boolean;
  previousValue?: any;
  disabled?: any;
  placeholder?: string;
  singleField?: boolean;
  hideTitle?: boolean;
  title?: string;
  size?: "small" | "medium";
  onSelectOption?: (address: any) => void;
}

const GooglePlacesAutocomplete: React.FC<GooglePlacesAutocompleteProps> = ({
  onPlaceSelect,
  value,
  onChange,
  required,
  previousValue,
  disabled,
  placeholder,
  singleField,
  title,
  hideTitle,
  size,
  onSelectOption,
}) => {
  const [inputValue, setInputValue] = useState<string>(value);
  const [options, setOptions] = useState<any[]>([]);
  const [googleLoaded, setGoogleLoaded] = useState<boolean>(false);

  useEffect(() => {
    const checkGoogleLoaded = () => {
      if (typeof google !== "undefined" && google.maps.places) {
        setGoogleLoaded(true);
      } else {
        alert("Google Maps API could not be loaded.");
      }
    };

    if (!googleLoaded) {
      const script = document.createElement("script");
      script.src =
        // "https://maps.googleapis.com/maps/api/js?key=AIzaSyDyAUx_-daxFtklRMBcgH5_BWEEpjq_hdo&libraries=places";
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyBhhQpijfQMsz98yVMVl7_f6QigmEKo55s&libraries=places";
      script.async = true;
      script.onload = checkGoogleLoaded;
      script.onerror = () =>
        console.error("Error loading Google Maps API script.");
      document.head.appendChild(script);
    } else {
      checkGoogleLoaded();
    }
  }, [googleLoaded]);

  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value);
    }
  }, [value]);

  useEffect(() => {
    if (!googleLoaded || inputValue === "") {
      setOptions([]);
      return;
    }

    const autocompleteService = new google.maps.places.AutocompleteService();
    autocompleteService.getPlacePredictions(
      { input: inputValue },
      (predictions, status) => {
        if (
          status === google.maps.places.PlacesServiceStatus.OK &&
          predictions
        ) {
          setOptions(
            predictions.map((prediction: any) => ({
              label: prediction.description,
              value: prediction.place_id,
              placeDetails: {
                country: prediction.terms.at(-1)?.value,
                state: prediction.terms.at(-2)?.value,
                city: prediction.terms.at(-3)?.value,
                line1:
                  prediction?.terms?.length > 3
                    ? prediction.terms
                        .slice(0, -3)
                        .map((term: any) => term?.value)
                        .join(", ")
                    : prediction?.terms
                        ?.map((term: any) => term?.value)
                        .join(", "),
              },
            }))
          );
        } else {
          setOptions([]);
        }
      }
    );
  }, [inputValue, googleLoaded]);

  const handlePlaceSelect = (address: any) => {
    onSelectOption && onSelectOption(address);
    if (googleLoaded && address?.value) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ placeId: address.value }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
          const addressComponents = results[0]
            ?.address_components as AddressComponent[];
          let postalCode = "";
          let state = "";
          addressComponents?.forEach((component) => {
            const types = component.types;
            if (types.includes("postal_code")) {
              postalCode = component.long_name;
            }

            if (types.includes("administrative_area_level_1")) {
              state = component.long_name;
            }
          });
          onPlaceSelect &&
            onPlaceSelect({
              city: address?.placeDetails?.city,
              state: state,
              country: address?.placeDetails?.country,
              postalCode,
              addressLine: address.label,
              placeId: address.value,
              line1: address?.placeDetails?.line1,
            });
          if (singleField) {
            return;
          } else {
            setInputValue(address?.placeDetails?.line1);
          }
        } else {
          console.error(status);
        }
      });
    }
  };

  const handleInputChange = (event: any, newInputValue: string) => {
    setInputValue(newInputValue);
    onChange && onChange(newInputValue);
    if (newInputValue === "") {
      onPlaceSelect &&
        onPlaceSelect({
          city: "",
          state: "",
          country: "",
          postalCode: "",
          line1: "",
        });
    }
  };

  return (
    <>
      {hideTitle ? null : (
        <FormLabels required={required}>{title || "Address line 1"}</FormLabels>
      )}
      <Autocomplete
        size={size || "medium"}
        freeSolo
        disabled={disabled}
        options={options || []}
        inputValue={inputValue || ""}
        onInputChange={handleInputChange}
        onChange={(event, value) => {
          if (value) {
            handlePlaceSelect(value);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            fullWidth
            placeholder={placeholder || "Enter address"}
          />
        )}
      />
    </>
  );
};

export default GooglePlacesAutocomplete;
