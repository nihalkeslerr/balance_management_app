import React from "react";

function CreditCardForm({ handleCreditCardSubmit, onChangeCreditInput }) {

  const handleNumberInput = (event) => {
    event.target.value = event.target.value.replace(/[^0-9]/g, "");
  };


  return (
    <div>
      <form onSubmit={handleCreditCardSubmit}>
        <label htmlFor="">Kart Numarası:<span className="text-red-600 ml-2">*</span></label>
        <input
          type="text"
          name="cardNumber"
          placeholder="0000-0000-0000-0000"
          onInput={handleNumberInput}
          onChange={(e) => onChangeCreditInput(e.target.name, e.target.value)}
          maxLength="16"
          className="border p-2 mb-2 w-full"
          required
        />
        <div className="flex">
          <div className="mb-2 w-full mr-2">
            <label htmlFor="">Son Geçerlilik Tarihi:<span className="text-red-600 ml-2">*</span></label>
            <input
              type="text"
              name="lastDate"
              placeholder="MM/YY"
              maxLength="5"
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9\/]/g, "");
              }}
              onChange={(e) => onChangeCreditInput(e.target.name, e.target.value)}
              className="border p-2  w-full mr-2"
              required
            />
          </div>
          <div className="mb-2 w-full mr-2">
            <label htmlFor="">Güvenlik Numarası:<span className="text-red-600 ml-2">*</span></label>
            <input
              type="text"
              name="cvv"
              placeholder="CVC"
              maxLength="3"
              onChange={(e) => onChangeCreditInput(e.target.name, e.target.value)}
              onInput={handleNumberInput}
              className="border p-2 w-full mr-2"
              required
            />
          </div>
          <div className="mb-2 w-full mr-2">
            <label htmlFor="">Tutar:<span className="text-red-600 ml-2">*</span></label>
            <input
              type="text"
              name="amount"
              placeholder=""
              onChange={(e) => onChangeCreditInput(e.target.name, e.target.value)}
              onInput={handleNumberInput}
              className="border p-2 w-full mr-2"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md w-full"
        >
          Ödeme Yap
        </button>
      </form>
    </div>
  );
}

export default CreditCardForm;
