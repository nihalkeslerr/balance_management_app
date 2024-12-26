import React from "react";

function LoanApplicationForm({ onChangeLoanInput, handleLoanSubmit }) {
  const handleNumberInput = (event) => {
    event.target.value = event.target.value.replace(/[^0-9]/g, "");
  };

  return (
    <div>
      <form onSubmit={handleLoanSubmit}>
        <div className="flex">
          <div className="mb-2 w-full mr-2">
            <label htmlFor="">İsim: <span className="text-red-600 ml-2">*</span></label>
            <input
              type="text"
              placeholder="Ad"
              className="border p-2 mb-2 w-full"
              name="name"
              onChange={(e) => onChangeLoanInput(e.target.name, e.target.value)}
              required
            />
          </div>
          <div className="mb-2 w-full mr-2">
            <label htmlFor="">Soy İsim:<span className="text-red-600 ml-2">*</span></label>
            <input
              type="text"
              placeholder="Soyad"
              className="border p-2 mb-2 w-full"
              name="lastName"
              onChange={(e) => onChangeLoanInput(e.target.name, e.target.value)}
              required
            />
          </div>
        </div>
        <label htmlFor="">TC Kimlik No:<span className="text-red-600 ml-2">*</span></label>
        <input
          type="text"
          placeholder="xxxxxxxxxxx"
          className="border p-2 mb-2 w-full"
          name="idNumber"
          maxLength="11"
          onInput={handleNumberInput}
          onChange={(e) => onChangeLoanInput(e.target.name, e.target.value)}
          required
        />
        <label htmlFor="">Tutar:<span className="text-red-600 ml-2">*</span></label>
        <input
          type="text"
          placeholder=""
          className="border p-2 mb-2 w-full"
          name="amount"
          onInput={handleNumberInput}
          onChange={(e) => onChangeLoanInput(e.target.name, e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md w-full"
        >
          Başvur
        </button>
      </form>
    </div>
  );
}

export default LoanApplicationForm;
