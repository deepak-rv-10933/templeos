import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api, qk } from '@/services';
import type { TempleQuery } from '@/types';

/* -------------------------------------------------------------------------- */
/* Temples                                                                    */
/* -------------------------------------------------------------------------- */

export const useTemples = (query?: TempleQuery) =>
  useQuery({ queryKey: qk.temples(query), queryFn: () => api.temples.list(query) });

export const useFeaturedTemples = () =>
  useQuery({ queryKey: qk.featured(), queryFn: () => api.temples.featured() });

export const useTemple = (slug: string) =>
  useQuery({ queryKey: qk.temple(slug), queryFn: () => api.temples.getBySlug(slug), enabled: !!slug });

export const useNearbyTemples = (lat: number, lng: number) =>
  useQuery({
    queryKey: qk.nearby({ lat, lng }),
    queryFn: () => api.temples.nearby({ lat, lng }),
  });

export const useCategories = () =>
  useQuery({ queryKey: qk.categories(), queryFn: () => api.temples.categories() });

export const useDistricts = () =>
  useQuery({ queryKey: qk.districts(), queryFn: () => api.temples.districts() });

export const useDeities = () =>
  useQuery({ queryKey: qk.deities(), queryFn: () => api.temples.deities() });

/* -------------------------------------------------------------------------- */
/* Feed, festivals, routes                                                    */
/* -------------------------------------------------------------------------- */

export const useFeed = (filter?: Parameters<typeof api.feed.list>[0]) =>
  useQuery({ queryKey: qk.feed(filter), queryFn: () => api.feed.list(filter) });

export const useFestivals = () =>
  useQuery({ queryKey: qk.festivals(), queryFn: () => api.festivals.list() });

export const useLiveFestivals = () =>
  useQuery({ queryKey: qk.liveFestivals(), queryFn: () => api.festivals.live() });

export const useRoutes = () =>
  useQuery({ queryKey: qk.routes(), queryFn: () => api.routes.list() });

export const useRoute = (id: string) =>
  useQuery({ queryKey: qk.route(id), queryFn: () => api.routes.getById(id), enabled: !!id });

/* -------------------------------------------------------------------------- */
/* Bookings & slots                                                           */
/* -------------------------------------------------------------------------- */

export const useBookings = () =>
  useQuery({ queryKey: qk.bookings(), queryFn: () => api.bookings.list() });

export const useBooking = (id: string) =>
  useQuery({ queryKey: qk.booking(id), queryFn: () => api.bookings.getById(id), enabled: !!id });

export const useSlots = (templeId: string, date: string) =>
  useQuery({
    queryKey: qk.slots(templeId, date),
    queryFn: () => api.bookings.slots(templeId, date),
    enabled: !!templeId && !!date,
  });

export const useCreateBooking = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.bookings.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.bookings() }),
  });
};

/* -------------------------------------------------------------------------- */
/* Donations, renovation                                                      */
/* -------------------------------------------------------------------------- */

export const useDonations = () =>
  useQuery({ queryKey: qk.donations(), queryFn: () => api.donations.list() });

export const useRenovations = () =>
  useQuery({ queryKey: qk.renovations(), queryFn: () => api.renovations.list() });

export const useRenovation = (id: string) =>
  useQuery({ queryKey: qk.renovation(id), queryFn: () => api.renovations.getById(id), enabled: !!id });

/* -------------------------------------------------------------------------- */
/* User, journey, KPIs                                                        */
/* -------------------------------------------------------------------------- */

export const useMe = () => useQuery({ queryKey: qk.me(), queryFn: () => api.user.me() });

export const useJourney = () =>
  useQuery({ queryKey: qk.journey(), queryFn: () => api.user.journey() });

export const useKpis = () => useQuery({ queryKey: qk.kpis(), queryFn: () => api.analytics.kpis() });

export const useToggleFollow = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.user.toggleFollow(id),
    onSuccess: (user) => qc.setQueryData(qk.me(), user),
  });
};

export const useToggleFavourite = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (templeId: string) => api.user.toggleFavourite(templeId),
    onSuccess: (user) => qc.setQueryData(qk.me(), user),
  });
};
