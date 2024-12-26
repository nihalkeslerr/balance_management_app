import React from 'react'

function CreateCouponForm({ handleCreateCoupon, onChangeCouponInfo }) {

    const handleNumberInput = (event) => {
        event.target.value = event.target.value.replace(/[^0-9]/g, "");
    };

    return (
        <div>
            <form onSubmit={handleCreateCoupon}>
                <label htmlFor="">Kupon Tutarı:<span className="text-red-600 ml-2">*</span></label>
                <input
                    type="text"
                    name="amount"
                    onInput={handleNumberInput}
                    onChange={(e) => onChangeCouponInfo(e.target.name, e.target.value)}
                    className="border p-2 mb-2 w-full"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded-md w-full"
                >
                    Kupon Oluştur
                </button>
            </form>

        </div>
    )
}

export default CreateCouponForm