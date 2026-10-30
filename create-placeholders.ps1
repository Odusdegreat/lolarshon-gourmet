$placeholder64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAAAAAAAAAAAAAAA'
$placeholder = [byte[]]([convert]::FromBase64String($placeholder64))

# hero.jpg
[IO.File]::WriteAllBytes('public/images/hero/hero.jpg',$placeholder)
Write-Host 'hero.jpg created'

# kitchen.jpg
[IO.File]::WriteAllBytes('public/images/hero/kitchen.jpg',$placeholder)
Write-Host 'kitchen.jpg created'

# menu placeholders
'jollof-grilled-chicken','red-velvet-cake','classic-hamper'|ForEach-Object{
  [IO.File]::WriteAllBytes("public/images/menu/$_",$placeholder)
}
Write-Host 'Menu placeholders created'

# gallery placeholders
'food-1','food-2','food-3','events-1','events-2','events-3','cakes-1','cakes-3','hampers-1','hampers-2'|ForEach-Object{
  [IO.File]::WriteAllBytes("public/images/gallery/$_",$placeholder)
}
Write-Host 'Gallery placeholders created'
Write-Host 'All done!'