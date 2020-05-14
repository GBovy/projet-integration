
    INSERT INTO public.global_ride_price_calculation_config(
        id, minimum_commission_by_ride, commission_by_kilometer, ride_cost_by_kilometer, ratio_kilometer_min, ratio_kilometer_max, min_gain_by_user
    ) VALUES (00000001, 2.00, 0.03, 0.17, 10, 5, 2.00);

	INSERT INTO public.users(
		user_id, uuid, access_role, address, banking_account, city, country,
		--credit_card, credit_card_validity,
		email, email_verified, first_name, image_url, last_name, password, paypal, profile_completed, provider, provider_id, user_role, vehicle_model, vehicle_year, zip_code)
	VALUES (
	1, '{8c878e6f-ee13-4a37-a208-7510c2638944}', 0, 'Rue du castor', '123456789', 'Liège', 'Belgique',
	--'123456789', '122025',
	'l@l.l', true, 'Damien', null, 'Durogier', '$2a$10$M1ZbpSSeKi/wc1noSHUB7OKjNhP0ThgqclHOO6XACjOv2a6QCIKIW', '123456789', true, 'local', null, 0, 0, '2015', '4000'
	);

--     INSERT INTO public.ride(
--         ride_id,
--         calculated_detour,
--         delivery_date,
--         delivery_type,
--         destination_address,
--         destination_city,
--         destination_country,
--         destination_zip_code,
--         max_mass,
--         max_volume,
--         price,
--         starting_address,
--         starting_city,
--         starting_country,
--         starting_zip_code,
--         distance,
--         max_distance,
--         duration,
--         user_id
--     ) VALUES
--         (00000001, 33.6, '12/12/2012', 0, 'Rue Neuve 11', 'Bruxelles', 'Belgium', '1000', 160.4, 166.5, 120.5, 'Rue Eugène Ysaye 12', 'Liège', 'Belgium', '4000', 105.4, 126.48, 60, 1),
--         (00000002, 33.6, '12/12/2012', 0, 'Quai Mativa 62', 'Liège', 'Belgium', '4020', 160.4, 166.5, 120.5, 'Rue Eugène Ysaye 12', 'Liège', 'Belgium', '4000', 105.4, 126.48, 60, 1),
--         (00000003, 33.6, '12/12/2012', 0, 'Rue des Naiveux 2', 'Liège', 'Belgium', '4000', 160.4, 166.5, 120.5, 'Rue des Peupliers 13', 'Magnée', 'Belgium', '4623', 105.4, 126.48, 60, 1),
--         (00000004, 33.6, '12/12/2012', 0, 'Rue des Vennes 366', 'Liège', 'Belgium', '4020', 160.4, 166.5, 120.5, 'Rue Neuve 9', 'Bruxelles', 'Belgium', '1000', 105.4, 126.48, 60, 1),
--         (00000005, 33.6, '12/12/2012', 1, 'Rue Saint Gilles', 'Liège', 'Belgium', '4000', 160.4, 166.5, 120.5, 'Rue des Vennes 12', 'Liège', 'Belgium', '4020', 105.4, 126.48, 60, 1),
--         (00000006, 33.6, '12/12/2012', 0, 'Rue Jonfosse 20', 'Liège', 'Belgium', '4000', 160.4, 166.5, 120.5, 'Quai Mativa 62', 'Liège', 'Belgium', '4020', 105.4, 126.48, 60, 1),
--         (00000007, 33.6, '12/12/2012', 0, 'Rue des Bruxelles 1', 'Bruxelles', 'Belgium', '1000', 160.4, 166.5, 120.5, 'Rue Eugène Ysaye 12', 'Liège', 'Belgium', '4000', 105.4, 126.48, 60, 1),
--         (00000008, 33.6, '12/12/2012', 1, 'Rue des Bruxelles 1', 'Bruxelles', 'Belgium', '1000', 160.4, 166.5, 120.5, 'Rue Eugène Ysaye 12', 'Liège', 'Belgium', '4000', 105.4, 126.48, 60, 1),
--         (00000009, 33.6, '12/12/2012', 1, 'Rue des Bruxelles 1', 'Bruxelles', 'Belgium', '1000', 160.4, 166.5, 120.5, 'Rue Eugène Ysaye 12', 'Liège', 'Belgium', '4000', 105.4, 126.48, 60, 1),
--         (00000010, 33.6, '12/12/2012', 1, 'Rue des Bruxelles 1', 'Bruxelles', 'Belgium', '1000', 160.4, 166.5, 120.5, 'Rue Eugène Ysaye 12', 'Liège', 'Belgium', '4000', 105.4, 126.48, 60, 1),
--         (00000011, 33.6, '12/12/2012', 1, 'Rue des Bruxelles 1', 'Bruxelles', 'Belgium', '1000', 160.4, 166.5, 120.5, 'Rue Eugène Ysaye 12', 'Liège', 'Belgium', '4000', 105.4, 126.48, 60, 1),
--         (00000012, 33.6, '12/12/2012', 1, 'Rue des Bruxelles 1', 'Bruxelles', 'Belgium', '1000', 160.4, 166.5, 120.5, 'Rue Eugène Ysaye 12', 'Liège', 'Belgium', '4000', 105.4, 126.48, 60, 1),
--         (00000013, 33.6, '12/12/2012', 1, 'Rue des Bruxelles 1', 'Bruxelles', 'Belgium', '1000', 160.4, 166.5, 120.5, 'Rue Eugène Ysaye 12', 'Liège', 'Belgium', '4000', 105.4, 126.48, 60, 1),
--         (00000014, 33.6, '12/12/2012', 1, 'Rue des Bruxelles 1', 'Bruxelles', 'Belgium', '1000', 160.4, 166.5, 120.5, 'Rue Eugène Ysaye 12', 'Liège', 'Belgium', '4000', 105.4, 126.48, 60, 1);

