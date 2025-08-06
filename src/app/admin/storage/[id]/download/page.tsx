import { redirect } from "next/navigation"
import { getFileUrl } from "@/app/actions/storage-actions"

export default async function DownloadFilePage({
  params,
}: {
  params: { id: string }
}) {
  const result = await getFileUrl(params.id)

  if (result.success && result.url) {
    redirect(result.url)
  } else {
    redirect(`/admin/storage/${params.id}?error=download-failed`)
  }
}
