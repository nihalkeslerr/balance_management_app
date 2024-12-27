import React from "react";

function CreditCardForm({ handleCreditCardSubmit, onChangeCreditInput }) { // Kredi Kartı ile bakiye arttırma formu

  const handleNumberInput = (event) => {
    event.target.value = event.target.value.replace(/[^0-9]/g, "");
  };


  return (
    <div className=" flex justify-content-center ">
      <div className="md:w-1/2 w-full p-2">
        <form onSubmit={handleCreditCardSubmit}>
          <label htmlFor="" className="text-gray-600 mb-1">Kart Numarası:<span className="text-red-600 ml-2">*</span></label>
          <input
            type="text"
            name="cardNumber"
            placeholder="0000-0000-0000-0000"
            onInput={handleNumberInput}
            onChange={(e) => onChangeCreditInput(e.target.name, e.target.value)}
            maxLength="16"
            className="border p-2 mb-2 w-full rounded-md"
            required
          />
          <div className="flex flex-wrap">
            <div className="mb-2 xl:w-1/3 w-full ">
              <label htmlFor="" className="text-gray-600 mb-1">Son Geçerlilik Tarihi:<span className="text-red-600 ml-2">*</span></label>
              <input
                type="text"
                name="lastDate"
                placeholder="MM/YY"
                maxLength="5"
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9/]/g, "");
                }}
                onChange={(e) => onChangeCreditInput(e.target.name, e.target.value)}
                className="border p-2  w-full mr-2 rounded-md"
                required
              />
            </div>
            <div className="mb-2 xl:w-1/3 w-full">
              <label htmlFor="" className="text-gray-600 mb-1">Güvenlik Numarası:<span className="text-red-600 ml-2">*</span></label>
              <input
                type="text"
                name="cvv"
                placeholder="CVC"
                maxLength="3"
                onChange={(e) => onChangeCreditInput(e.target.name, e.target.value)}
                onInput={handleNumberInput}
                className="border p-2 w-full mr-2 rounded-md"
                required
              />
            </div>
            <div className="mb-2 xl:w-1/3 w-full">
              <label htmlFor="" className="text-gray-600 mb-1">Tutar:<span className="text-red-600 ml-2">*</span></label>
              <input
                type="text"
                name="amount"
                placeholder=""
                onChange={(e) => onChangeCreditInput(e.target.name, e.target.value)}
                onInput={handleNumberInput}
                className="border p-2 w-full rounded-md"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-700 text-white p-2 rounded-md w-full mt-3"
          >
            Ödeme Yap
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreditCardForm;
