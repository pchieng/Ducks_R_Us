import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"
import "./StripeStyle.css"

const PUBLIC_KEY = "pk_test_51L4zB0EKprW50bWwNL9tm5ruqcRME69Pyy8jwxiHAzWVQEiIC7NCwen3K4ULNzqN35O1dGbnokkymDDCYP8ZbB5M00ZsmLgHyc"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer(props) {
    return (
        <Elements stripe={stripeTestPromise}>
            <PaymentForm totalAmount={props.totalAmount} />
        </Elements>
    )
}

