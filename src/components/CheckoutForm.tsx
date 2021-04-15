import {useForm, Controller} from "react-hook-form";
import {cartReducer} from "../redux/slices/cart";
import MaskedInput from "react-text-mask";

type Inputs = {
    name: string;
    email: string;
    phone: string;
}

type CheckoutFormProps = {
    onSubmit: (data: Inputs) => {}
}

const CheckoutForm = (props: CheckoutFormProps) => {
    const { register, handleSubmit, watch, formState: { errors }, control, reset } = useForm<Inputs>();
    const onSubmit = data => console.log(data);

    return <form onSubmit={handleSubmit(onSubmit)}>
        <div>
            <label>Name</label>
            <input name="name" type="text" {...register("name", {required: true})} />
            <p>{errors.name && "Name is required"}</p>
        </div>
        <div>
            <label>Email</label>
            <input name="email" type="email" {...register("email", {required: true})} />
            <p>{errors.email && "Email is required"}</p>
        </div>
        <div>
            <label>Phone</label>
            <Controller
                rules={{required: true}}
                render={
                    ({field}) => <MaskedInput mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]} showMask={true} {...field}/>
                } name="phone" control={control}/>
            <p>{errors.phone && "Phone is required"}</p>
        </div>
        <button onClick={() => reset()}>Reset</button>
        <button type="submit">Submit</button>
    </form>;
};
export default CheckoutForm;