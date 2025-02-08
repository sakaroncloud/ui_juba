import { z } from "zod";
import { EDocumentType, Gender, Role } from "@repo/ui/types/user.types";

export const changePasswordSchema = z.object({
    oldPassword: z
        .string()
        .trim()
        .min(1, { message: "Old password is required." }),

    newPassword: z
        .string()
        .trim()
        .min(8, { message: "Password must be at least 8 characters long." })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
        .regex(/[0-9]/, { message: "Password must contain at least one number." })
        .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character." })
        .regex(/^(?!.*(.)\1{2,})/, { message: "Password cannot contain three or more consecutive identical characters." })
        .regex(/^(?!.*(?:password|1234|qwerty|admin)).*$/, { message: "Password cannot contain common words or patterns like 'password', '1234', or 'qwerty'." }),

    confirmPassword: z
        .string()
        .trim()
        .min(1, { message: "Confirm password is required." }),
}).refine((data) => data.newPassword !== data.oldPassword, {
    message: "Old and new passwords cannot be the same.",
    path: ["newPassword"],
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Confirm password does not match the new password.",
    path: ["confirmPassword"],
});



export type TChangePassword = z.infer<typeof changePasswordSchema>;

// ------ For Login

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(2).trim(),
});

export type TLogin = z.infer<typeof loginSchema>;

// ------ For Register
export const signUpSchema = z.object({

    fullName: z
        .string()
        .min(1, {
            message: "First Name is required",
        })
        .trim(),

    email: z
        .string({
            required_error: "Email is required",
        })
        .email({
            message: "Please enter a valid email address",
        })
        .trim(),
    password: z
        .string()
        .trim()
        .min(8, { message: "Password must be at least 8 characters long." })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
        .regex(/[0-9]/, { message: "Password must contain at least one number." })
        .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character." })
        .regex(/^(?!.*(.)\1{2,})/, { message: "Password cannot contain three or more consecutive identical characters." })
        .regex(/^(?!.*(?:password|1234|qwerty|admin)).*$/, { message: "Password cannot contain common words or patterns like 'password', '1234', or 'qwerty'." }),
    phone: z.string().min(1, {
        message: "Phone is required",
    }),
});
export type TSignUp = z.infer<typeof signUpSchema>;


// ------ For Forget Password
export const forgetPasswordSchema = z.object({
    email: z.string().email(),
});

export type TForgetPassword = z.infer<typeof forgetPasswordSchema>;

// ------ For OTP
export const otpSchema = z.object({
    otp: z.string().length(6),
    verificationToken: z.string(),
});

export type TOtp = z.infer<typeof otpSchema>;

// ------ For New Password
export const newPasswordSchema = z
    .object({
        password: z.string().min(6),
        confirmPassword: z.string(),
        token: z.string(),
    })
    .refine(
        (values) => {
            return values.password === values.confirmPassword;
        },
        {
            message: "Passwords must match!",
            path: ["confirmPassword"],
        }
    );

export type TNewPassword = z.infer<typeof newPasswordSchema>;

export const newUserSchema = z.object({
    email: z
        .string({
            required_error: "Email is required",
        })
        .email({
            message: "Please enter a valid email address",
        })
        .trim(),
    role: z.nativeEnum(Role)
});


export type TNewUser = z.infer<typeof newUserSchema>

export const profileBasicSchema = z.object({
    fullName: z
        .string()
        .min(1, {
            message: "First Name is required",
        })
        .trim(),



    phone: z.string().min(1, {
        message: "Phone is required",
    }).nullable().optional(),

    avatar: z.string().uuid({
        message: "Please select Banner Image"
    }).optional().nullable(),

    dob: z.string().optional().nullable(),
    gender: z.nativeEnum(Gender)
});
export type TProfileBasic = z.infer<typeof profileBasicSchema>

export const staffProfileSchema = profileBasicSchema.merge(z.object({
    documentId: z.string().length(15).optional().nullable(),
    documentType: z.nativeEnum(EDocumentType).optional().nullable(),
    documentImage: z.object({
        id: z.string(),
        url: z.string(),
    }).optional().nullable(),
}))

export type TStaffProfile = z.infer<typeof staffProfileSchema>
