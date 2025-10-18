import Image from "next/image"
import Link from "next/link"

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="bg-muted flex min-h-svh items-center 
      justify-center gap-5 p-5 md:p-10"
    >
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href={"/"} className="flex items-center justify-center gap-2">
          <Image src={"logo.svg"} alt="logo" width={30} height={30} />
          AutoNode
        </Link>
        {children}
      </div>
    </div>
  )
}
