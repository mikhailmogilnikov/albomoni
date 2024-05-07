import { UserPage } from '@albomoni/page/public/user';
import { I18nLangParam } from '@albomoni/shared/model/types/i18n.type';

type Props = {
  params: I18nLangParam & { userId: string };
};

export default async function User({ params: { lng, userId } }: Props) {
  return <UserPage lng={lng} userId={userId} />;
}
