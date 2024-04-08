/* eslint-disable no-param-reassign */

'use client';

import { useState } from 'react';
import { useImmer } from 'use-immer';
import { useQuery } from '@tanstack/react-query';
import { useCookie } from 'react-use';
import { Spinner } from '@nextui-org/spinner';
import { InitialChosenMemoryState } from '../config/initial-chosen-memory-state';
import { GetPlaceCategoriesQueries } from '../api';
import { PlaceAdSkeleton } from './skeleton';
import { PlaceAdNavigation } from './navigation';
import { SelectFilters } from './select-filters';
import { PlaceAdForm } from './form';
import { PlaceAdSuccess } from './success';

export const PlaceAd = () => {
  const [token] = useCookie('token');
  const { data, isPending, isLoading } = useQuery(
    GetPlaceCategoriesQueries(token as string),
  );

  const [chosenMemoryState, updateChosenMemoryState] = useImmer(
    InitialChosenMemoryState,
  );
  const [selectedVariants, updateSelectedVariants] = useImmer<any>([]);
  const [variants, setVariants] = useState<any>(data);
  const [formData, setFormData] = useState<any>(null);

  if (isLoading || isPending) return <PlaceAdSkeleton />;

  return (
    <>
      {chosenMemoryState.prevSelected.length > 0 && (
        <PlaceAdNavigation
          chosenMemoryState={chosenMemoryState}
          formData={formData}
          setFormData={setFormData}
          setVariants={setVariants}
          updateChosenMemoryState={updateChosenMemoryState}
          updateSelectedVariants={updateSelectedVariants}
        />
      )}

      {!formData && (
        <SelectFilters
          variants={variants}
          selectedVariants={selectedVariants}
          setVariants={setVariants}
          setFormData={setFormData}
          updateChosenMemoryState={updateChosenMemoryState}
          updateSelectedVariants={updateSelectedVariants}
        />
      )}

      {formData === 'loading' && <Spinner />}

      {formData && formData !== 'loading' && formData !== 'success' && (
        <PlaceAdForm formData={formData} setFormData={setFormData} />
      )}

      {formData === 'success' && <PlaceAdSuccess />}
    </>
  );
};
