import React from 'react'
import useAxiosPublic from './useAxiosPublic'
import { useQuery } from '@tanstack/react-query';

const useProducts = () => {
    const axiosPublic = useAxiosPublic();
    const { data: products=[], isPending: loading, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
          const res = await axiosPublic.get('/products');
        //   console.log(res.data)
          return res.data;
        },
      })
  return [products, loading, refetch]
}

export default useProducts