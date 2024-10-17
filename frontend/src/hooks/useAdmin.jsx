import React from 'react'
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosPublic from './useAxiosPublic';

const useAdmin = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const AxiosPublic = useAxiosPublic();
    const { refetch, data: isAdmin, isPending: isAdminLoading} = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        queryFn: async () => {
           const res = await axiosSecure.get(`users/admin/${user?.email}`)
        // const res = await AxiosPublic.get(`users/admin/${user?.email}`)
        //    console.log(res.data)
            return res.data?.admin;
        }
    })

//   console.log("admin",isAdmin, "loading->",isAdminLoading)
    return [isAdmin, isAdminLoading]
}

export default useAdmin;